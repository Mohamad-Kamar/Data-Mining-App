from utils import calculate_support

"""
Support:
The ratio of the records having true values for
the attributes of (X and Y) to the number of all
records
"""

list_length = 13

first_record_list = [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
second_record_list = [1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]

support = calculate_support(first_record_list, second_record_list, list_length)

print(support)
