from tornado import gen, ioloop, web
import json

class ReadDataAPI(web.RequestHandler):
    @gen.coroutine
    def get(self):
        self.write({"results" :getResults()})
ROUTES = [
    (r"/read", ReadDataAPI)
]
def getResults():
    lst = []
    with open('public/itpas2.txt') as f:
        for line in f:
            lst.append(line)
    print len(lst)
    return lst


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
