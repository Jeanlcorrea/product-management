from enum import Enum, EnumMeta
from typing import List


class ProductManagementBaseEnum(Enum):

    @classmethod
    def choices(cls, **kwargs):
        return choices_from_enum(cls, **kwargs)

    @classmethod
    def ordering(cls):
        choices = cls.choices()
        ordering = []
        for choice in choices:
            ordering.append(choice[0])
            ordering.append(f'-{choice[0]}')
        return ordering


def choices_from_enum(enum_: EnumMeta, field_pattern: tuple = ("value", "value")) -> List[tuple]:
    first_field, second_field = field_pattern
    return [(getattr(choice, first_field), getattr(choice, second_field)) for choice in enum_]
