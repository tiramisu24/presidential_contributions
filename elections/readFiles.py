from tornado import gen, ioloop, web
import json

class HotelSearchApiHandler(web.RequestHandler):
    @gen.coroutine
    def get(self):
        self.write({"results" :getResults()})
ROUTES = [
    (r"/hotels/search", HotelSearchApiHandler)
]
def getResults():
    lst = []
    with open('../public/itpas2.txt') as f:
        for line in f:
            print line
            lst.append(line)
    return lst


def run():
    app = web.Application(
        ROUTES,
        debug=True,
    )
    app.listen(9000)
    print "Server started. lisiening port 8000"

    ioloop.IOLoop.current().start()


if __name__ == '__main__':
    run()
