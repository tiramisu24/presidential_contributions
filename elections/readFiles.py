
from tornado import gen, ioloop, web
import json
import re

class ReadDataAPI(web.RequestHandler):
    @gen.coroutine
    def get(self):
        self.write(getResults())
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

ROUTES = [
    (r"/read", ReadDataAPI)
]

def getResults():
    res = {}
    with open('public/itpas2.txt') as f:
        for line in f:
            cols = line.split("|")
            committee_id = cols[0]
            transaction_type = cols[5]
            entity_type = cols[6]
            recipient = cols[7]
            transaction_amount = int(cols[14])
            if is_candidate(recipient):
                # only count contributions and not expenditures
                if transaction_amount < 0:
                    continue
                # exception handling for Hillary and Bernie
                if recipient == 'HILLARY FOR AMERICA':
                    candidate = 'CLINTON'
                elif recipient == 'BERNIE 2016':
                    candidate = 'BERNIE'
                else:
                    # first find prefix before the " FOR", then get the last name
                    candidate = re.search(r"[^<>]+(?= FOR)", recipient).group().split(" ")[-1]
                if not candidate in res:
                    res[candidate] = {
                        "total": 0,
                        # native python set is not json serializable
                        # therefore making a dictionary with key of
                        # committee_id and value of number of contributions
                        "contributors": {},
                        "contributions": []
                    }
                res[candidate]["total"] += transaction_amount
                if not committee_id  in res[candidate]["contributors"]:
                    res[candidate]["contributors"][committee_id] = 0
                # this maps number of contributions from contributor
                res[candidate]["contributors"][committee_id] += 1
                contribution = {
                    "committee_id": committee_id,
                    "amount": transaction_amount
                }
                res[candidate]["contributions"].append(contribution)
    return res

def is_candidate(recipient):
    # many names are mispelled tagged with "FOR AMERICA", therefore
    # I am only adding exception handling for DNC candidates Hillary
    # Clinton and Bernie Sanders
    return (re.search(r'\bFOR PRESIDENT\b', recipient) or
            recipient == 'HILLARY FOR AMERICA' or
            recipient == 'HILLARY CLINTON FOR AMERICA' or
            recipient == 'BERNIE 2016')

def dummy():
    res = {
        "Trump":{"total": 15, "contributers": {1:1},"contributions": [{"committee_id": 1, "amt": 1},{"committee_id": 2, "amt": 14}]},
        "Hillary": {"total": 10, "contributers": {1:1},"contributions":  [{"committee_id": 2, "amt": 1},{"committee_id": 3, "amt": 9}]},
        "Bernie": {"total": 5, "contributers": {1:1},"contributions": [ {"committee_id": 5, "amt": 3},{"committee_id": 6, "amt": 2}]}
    }
    return res

def run():
    app = web.Application(
        ROUTES,
        debug=True,
    )
    app.listen(9000)
    print "Server started. lisiening port 9000"

    ioloop.IOLoop.current().start()


if __name__ == '__main__':
    run()
