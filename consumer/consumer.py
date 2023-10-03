import requests
url = f'http://127.0.0.1:8000/productmanagement/'

response = requests.get(url)
data = response.json()

if response.status_code == 200:
    print(data)
else:
    print('404 Not Found')
