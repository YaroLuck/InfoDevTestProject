Тестовое задание для кандидатов на должность разработчика Python\Django

Задача: веб-приложение, обеспечивающее возможность работы со справочником устройств оповещения.

Модель:
* Название
* Тип устройства (сирена или громкоговоритель) – через Choices.
* Адрес размещения (строка)
* Широта (число с 6 знаками после запятой)
* Долгота (число с 6 знаками после запятой)
* Радиус зоны звукопокрытия (целое число в метрах)

Функциональные возможности:
* Постраничный просмотр списка существующих в системе устройств оповещения
* Полнотекстовый поиск по точному совпадению части названия или адреса размещения устройства оповещения
* Фильтрация устройств оповещения по выбранному типу
* Фильтрация устройств оповещения по попаданию в прямоугольную область, заданную координатами левого верхнего и правого нижнего угла
* Фильтрация устройств оповещения, у которых радиус зоны звукопокрытия лежит в заданном пользователем диапазоне из минимального и максимального значения
* Если задано несколько фильтров одновременно, то результат фильтрации должен включать в себя устройства оповещения, которые удовлетворяют всем условиям фильтрации одновременно
* Административная часть приложения должна быть доступна только администратору и обеспечивать возможность просмотра списка устройств оповещения, а также выполнения операций добавления, редактирования и удаления устройств оповещения

Технологии:
* Python
* Django
* Django REST
