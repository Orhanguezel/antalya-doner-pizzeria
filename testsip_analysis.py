import unittest
import requests
from datetime import datetime, date

class TestOrderAnalytics(unittest.TestCase):
    
    BASE_URL = 'http://localhost:5000/api'  # API base URL
    
    def test_fetch_archived_orders(self):
        """Arşivlenmiş siparişlerin başarıyla çekildiğini doğrular."""
        response = requests.get(f'{self.BASE_URL}/orders/archived')
        self.assertEqual(response.status_code, 200, "Status kodu 200 olmalı.")
        
        orders = response.json()
        self.assertIsInstance(orders, list, "Veri list olmalı.")
        print(f'Arşivlenmiş Siparişler: {len(orders)} adet')

    def test_daily_orders(self):
        """Günlük siparişlerin doğru işlendiğini doğrular."""
        response = requests.get(f'{self.BASE_URL}/orders/archived')
        self.assertEqual(response.status_code, 200)
        
        orders = response.json()
        daily_orders_map = {}

        for order in orders:
            order_date = datetime.strptime(order['createdAt'], "%Y-%m-%dT%H:%M:%S.%fZ").date()
            if order_date in daily_orders_map:
                daily_orders_map[order_date] += 1
            else:
                daily_orders_map[order_date] = 1

        for date, count in daily_orders_map.items():
            print(f"{date} tarihinde {count} sipariş var")

        self.assertGreater(len(daily_orders_map), 0, "Günlük siparişler işlenemedi.")

    def test_weekly_orders(self):
        """Haftalık siparişlerin doğru işlendiğini doğrular."""
        response = requests.get(f'{self.BASE_URL}/orders/archived')
        self.assertEqual(response.status_code, 200)
        
        orders = response.json()
        weekly_orders_map = {}

        def get_week(date_obj):
            first_day_of_year = date(date_obj.year, 1, 1)  # Tarih objesi oluşturduk
            past_days_of_year = (date_obj - first_day_of_year).days
            return (past_days_of_year + first_day_of_year.weekday()) // 7 + 1

        for order in orders:
            order_date = datetime.strptime(order['createdAt'], "%Y-%m-%dT%H:%M:%S.%fZ").date()
            week = get_week(order_date)
            if week in weekly_orders_map:
                weekly_orders_map[week] += 1
            else:
                weekly_orders_map[week] = 1

        for week, count in weekly_orders_map.items():
            print(f"{week}. haftada {count} sipariş var")

        self.assertGreater(len(weekly_orders_map), 0, "Haftalık siparişler işlenemedi.")

    def test_top_products(self):
        """En çok sipariş edilen ürünlerin doğru işlendiğini doğrular."""
        response = requests.get(f'{self.BASE_URL}/orders/archived')
        self.assertEqual(response.status_code, 200)
        
        orders = response.json()
        product_counts = {}

        for order in orders:
            for item in order['items']:
                if item['name'] in product_counts:
                    product_counts[item['name']] += item['quantity']
                else:
                    product_counts[item['name']] = item['quantity']

        top_products = sorted(product_counts.items(), key=lambda x: x[1], reverse=True)

        for product, count in top_products[:10]:
            print(f"{product}: {count} kez sipariş edildi")

        self.assertGreater(len(top_products), 0, "En çok sipariş edilen ürünler işlenemedi.")

if __name__ == '__main__':
    unittest.main()
