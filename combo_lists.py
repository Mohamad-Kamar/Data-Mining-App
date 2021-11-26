import itertools
from utils import DATA_SET




def count_unique_values(data_set) -> dict:
    unique_values_count = dict()
    for entry in data_set:
        for element in entry:
            element_as_tuple = tuple(element)
            unique_values_count[element_as_tuple] = unique_values_count.get(element_as_tuple, 0) + 1
    return unique_values_count


def filter_combination_frequency_object(comb_freq_object, support):
    return {
        k: v for k, v in comb_freq_object.items() if v >= support
    }


def get_unique_items(comb_freq_list, k):
    unique_items = set()
    for comb_freq in comb_freq_list.keys():
        for elem in comb_freq:
            unique_items.add(elem)
    combination_iterable = itertools.combinations(unique_items, k)
    combination_iterable_of_sets = list(map(lambda element:set(element), combination_iterable))
    return combination_iterable_of_sets

def count_cominations(combination, DATA_SET):
    new_comb_freq = {}
    for combo in combination:
        for item_set in DATA_SET:
            if combo <= item_set:
                combo_tuple = tuple(combo)
                new_comb_freq[combo_tuple] = new_comb_freq.get(combo_tuple, 0) + 1
    return new_comb_freq

def main():

    support_value = 2
    list_length = len(DATA_SET)

    initial_combination_frequency = count_unique_values(DATA_SET)
    initial_combination_of_one =list(map(lambda element:set(element), initial_combination_frequency.keys()))

    filtered_initial_combination_frequency = filter_combination_frequency_object(initial_combination_frequency, support_value)


    all_combinations_list = [initial_combination_of_one]
    combinations_frequency_list = [filtered_initial_combination_frequency]

    k = 2
    while len(combinations_frequency_list[-1]) != 0:
        prev_comb_to_freq = combinations_frequency_list[-1]
        current_combination =  get_unique_items(prev_comb_to_freq, k)

        current_comb_to_freq = count_cominations(current_combination, DATA_SET)
        current_filtered_comb_to_freq = filter_combination_frequency_object(current_comb_to_freq, support_value)

        all_combinations_list.append(current_combination)
        combinations_frequency_list.append(current_filtered_comb_to_freq)
        k += 1


    print(all_combinations_list[-1])
    print(combinations_frequency_list[-2])


main()
