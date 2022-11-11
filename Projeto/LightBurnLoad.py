import socket

UDP_IP = "127.0.0.1"
UDP_OUT_PORT = 19840
UDP_IN_PORT = 19841
MESSAGE = "LOADFILE:F:\\BeeTest.ai"
# MESSAGE = "FORCELOAD:F:\\BeeTest.ai"
# MESSAGE = "CLOSE"
# MESSAGE = "FORCECLOSE"

print ("UDP target IP:", UDP_IP)
print ("UDP target port:", UDP_OUT_PORT)
print ("UDP input port:", UDP_IN_PORT)
print ("message:", MESSAGE)

outSock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
inSock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

inSock.bind( (UDP_IP, UDP_IN_PORT) )

outSock.sendto(MESSAGE, (UDP_IP, UDP_OUT_PORT))
data, addr = inSock.recvfrom(1024)
print (data, addr)
