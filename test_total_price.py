import unittest
import requests

class TestOrderAnalytics(unittest.TestCase):

    BASE_URL = 'http://localhost:5000/api'  # API base URL

    def test_fetch_archived_orders(self):
        """Arşivlenmiş siparişlerin başarıyla çekildiğini doğrular."""
        response = requests.get(f'{self.BASE_URL}/orders/archived')
        self.assertEqual(response.status_code, 200, "Status kodu 200 olmalı.")

        orders = response.json()
        self.assertIsInstance(orders, list, "Veri list olmalı.")
        print(f'Arşivlenmiş Siparişler: {len(orders)} adet')

    def test_total_price_calculation(self):
        """Siparişlerin toplam fiyat hesaplamalarını doğrular."""
        response = requests.get(f'{self.BASE_URL}/orders/archived')
        self.assertEqual(response.status_code, 200, "Status kodu 200 olmalı.")

        orders = response.json()

        for order in orders:
            print(f"Sipariş ID: {order.get('_id')} - Items: {order['items']}")

            # TotalPrice zaten ekstraları içeriyorsa ekstraları ayrı eklemeyin
            total_price_calculated = sum(
                item.get('totalPrice', 0) for item in order['items']
            )

            # Teslimat ücreti eklenmeli mi?
            delivery_fee = order.get('deliveryFee', 0)
            total_price_calculated += delivery_fee

            total_price_from_api = order.get('total', 0)

            self.assertAlmostEqual(total_price_calculated, total_price_from_api, delta=0.01,
                                   msg=f"Toplam fiyat hesaplaması hatalı. Sipariş ID: {order.get('_id')}")

            print(f"Sipariş ID: {order.get('_id')} - Hesaplanan Toplam Fiyat: {total_price_calculated} - API Toplam Fiyatı: {total_price_from_api}")

if __name__ == '__main__':
    unittest.main()
