import random

def which(n):
    s = 0
    for i in range(1, n):
        if n % i == 0:
            s += i
    if s == n:
        return "P"
    elif s > n:
        return "A"
    else:
        return "D"


numbers = random.sample(xrange(100), 50)
print(map(lambda n: (which(n), n), numbers))
