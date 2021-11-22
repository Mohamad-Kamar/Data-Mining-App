from utils import calculate_support

list_length = 13

first_record_list = [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
second_record_list = [1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]

support = calculate_support(first_record_list, second_record_list, list_length)

print(support)
