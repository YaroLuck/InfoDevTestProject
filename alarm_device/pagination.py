"""Пагинация."""

from rest_framework import pagination


class StandardResultsSetPagination(pagination.PageNumberPagination):
    """Класс пагинации."""

    page_size = 4
    page_size_query_param = 'page_size'
