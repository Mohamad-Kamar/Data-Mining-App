DATA_SET = [
    {'A', 'B', 'E'},
    {'B', 'D'},
    {'B', 'C'},
    {'A', 'B', 'D'},
    {'A', 'C'},
    {'B', 'C'},
    {'A', 'C'},
    {'A', 'B', 'C', 'E'},
    {'A', 'B', 'C'},
    {'F'},

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
