from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import json

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=chrome_options)

data = {
    "scrapper_id": "dummy_scrapper",
    "payload": "dummy_payload",
    "aggregate": "dummy_aggregate",
    "created": "2023-01-01 00:00:00"
}

print(json.dumps(data))

driver.quit()