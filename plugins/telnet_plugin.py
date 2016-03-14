from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from geoip import geolite2

Base = declarative_base()


class Telnet(Base):
    __tablename__ = 'telnet'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    geo_ip = Column(String)


class Plugin:

    ORM = {"table": {"table_name": "telnet",
                     "column": [{"name": "username", "type": "TEXT"},
                                {"name": "password", "type": "TEXT"},
                                {"name": "ip", "type": "TEXT"}]
                     }}

    def __init__(self):
        # print "Module Loaded and waiting on run() command"
        self.geo_ip = None
        self.passwords = []
        self.count = 0
        self.username = []
        self.PORT = 8888

    def run(self, socket, address, session):
        # print("Port Number: " + socket.getsockname()[0])
        socket.settimeout(35)
        if socket:
            # for loop and try catch the timeout exception
            for i in range(0, 3):
                # try catch
                socket.sendall("username:")
                try:
                    # this sets the timeout and times out after 35 seconds
                    username = socket.recv(64)
                except socket.timeout:
                    print 'timeout error'
                else:
                    # otherwise it receives the data and shuts the timeout off
                    username = socket.recv(64)
                    socket.settimeout(None)
                    self.username.append(username)
                print 'username' + username
                socket.sendall("Password: ")
                try:
                    password = socket.recv(64)
                except socket.timeout:
                    print 'timeout error'
                else:
                    password = socket.recv(64)
                    # socket.settimeout(None)
                    self.passwords.append(password)
                # session.add_all([User(username='', password=''),
                # User(username='', password='')])
                # session.commit()
                print 'Password : ' + password
                socket.sendall("---Incorrect--\n")
                # socket.sendall("Password: ")
                self.count += 1
                record = Telnet(username=username, password=password, geo_ip=self.get_geo_ip(address[0]))
                session.add(record)
                session.commit()
                session.close()

            socket.close()
        else:
            print "socket error"

    def get_port(self):
        return self.PORT

    def get_orm(self):
        return self.ORM

    def get_geo_ip(self, host):
        match = geolite2.lookup(host)
        self.geo_ip = match.location  # (latitude, longitude)
        return self.geo_ip
