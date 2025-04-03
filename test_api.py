import requests
import sys

def test_api(url):

    get_response = requests.get(f"{url}/test")
    print(f"GET Response: {get_response.json()}")

    put_response = requests.put(f"{url}/test", json={"value": "hello"})
    print(f"PUT Response: {put_response.json()}")

    get_response = requests.get(f"{url}/test")
    print(f"GET Response: {get_response.json()}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python test_api.py <url>")
        sys.exit(1)
    test_api(sys.argv[1])