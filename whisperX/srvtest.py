import os
import traceback
import sys


pyvideo = sys.argv[1]

print(pyvideo)
print(os.system('python3 model.py {0}'.format(pyvideo)))

def a():
    return 3

a
