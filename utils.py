# DATA_SET = [
#     {'A', 'B', 'E'},
#     {'B', 'D'},
#     {'B', 'C'},
#     {'A', 'B', 'D'},
#     {'A', 'C'},
#     {'B', 'C'},
#     {'A', 'C'},
#     {'A', 'B', 'C', 'E'},
#     {'A', 'B', 'C'},
#     {'F'},

# ]

# DATA_SET = [
#     {'p', 'L', 'g'},
#     {'p', 'c'},
#     {'p', 'L', 'g'},
#     {'p', 'L', 'g'},
#     {'p', 'g'},
#     {'g'},
#     {'L', 'g'},
# ]

DATA_SET = [
    {'1', 'B', 'b', 'W', 'L', 'm', 'M'},
    {'1', 'B', 'b', 'W'},
    {'1', 'B', 'b', 'S', '5', 'm', 'M', 'F'},
    {'W', 'b'},
    {'F', 'M', 'L', 'm'},
    {'2', 'S', 'm', 'M'},

]

def intersect(flist, slist, list_length):
    total = 0
    for i in range(list_length):
        fnum = flist[i]
        snum = slist[i]

        if fnum and snum:
            total += 1
    return total

def get_true_records(some_list, list_length):
    total = 0
    for i in range(list_length):
        fnum = some_list[i]
        if fnum:
            total += 1
    return total


def calculate_support(flist, slist, list_length):
    support = intersect(flist, slist, list_length) / list_length
    return support * 100



def calculate_confidence(flist, slist, list_length):
    true_first_records = get_true_records(flist, list_length)
    confidence = intersect(flist, slist, list_length) / true_first_records
    return confidence * 100
