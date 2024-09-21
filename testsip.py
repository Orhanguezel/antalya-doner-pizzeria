import requests
import unittest

# API base URL
API_BASE_URL = 'http://localhost:5000/api'  # Değiştirmen gerekebilir

# Token burada sabit, gerçek testlerde dinamik alabilirsin
TOKEN = 'Bearer <your_token>'  # Burada gerçek token'ı kullanman gerekecek

# Test API çağrıları için headers ayarlama
HEADERS = {
    'Authorization': TOKEN,
    'Content-Type': 'application/json'
}

class TestOrderAPI(unittest.TestCase):
    
    def test_fetch_orders(self):
        """
        API'den siparişleri al ve siparişlerin arşivlenip arşivlenmediğini kontrol et.
        """
        response = requests.get(f'{API_BASE_URL}/orders', headers=HEADERS)
        self.assertEqual(response.status_code, 200, 'API yanıtı 200 değil')
        
        orders = response.json()
        self.assertIsInstance(orders, list, 'Dönen veri list formatında değil')

        # Archived olmayan siparişlerin sayısını kontrol ediyoruz
        non_archived_orders = [order for order in orders if not order.get('archived', False)]
        
        print(f'Toplam sipariş: {len(orders)}')
        print(f'Arşivlenmemiş siparişler: {len(non_archived_orders)}')

        # Arşivlenmemiş siparişler var mı diye kontrol ediyoruz
        self.assertGreater(len(non_archived_orders), 0, 'Arşivlenmemiş sipariş yok')

    def test_delivery_order_count(self):
        """
        API'den sadece teslimat (delivery) siparişlerini al ve sayıyı kontrol et.
        """
        response = requests.get(f'{API_BASE_URL}/orders', headers=HEADERS)
        self.assertEqual(response.status_code, 200, 'API yanıtı 200 değil')
        
        orders = response.json()
        
        # Teslimat olan ve arşivlenmemiş siparişleri sayıyoruz
        delivery_orders = [order for order in orders if order.get('orderType') == 'delivery' and not order.get('archived', False)]
        
        print(f'Teslimat siparişleri: {len(delivery_orders)}')
        
        # Teslimat siparişleri var mı diye kontrol ediyoruz
        self.assertGreater(len(delivery_orders), 0, 'Teslimat siparişi yok')

    def test_pickup_order_count(self):
        """
        API'den sadece paket servis (pickup) siparişlerini al ve sayıyı kontrol et.
        """
        response = requests.get(f'{API_BASE_URL}/orders', headers=HEADERS)
        self.assertEqual(response.status_code, 200, 'API yanıtı 200 değil')
        
        orders = response.json()
        
        # Paket servis olan ve arşivlenmemiş siparişleri sayıyoruz
        pickup_orders = [order for order in orders if order.get('orderType') == 'pickup' and not order.get('archived', False)]
        
        print(f'Paket servis siparişleri: {len(pickup_orders)}')
        
        # Paket servis siparişleri var mı diye kontrol ediyoruz
        self.assertGreater(len(pickup_orders), 0, 'Paket servis siparişi yok')

    def test_dinein_order_count(self):
        """
        API'den sadece restoran içi (dinein) siparişlerini al ve sayıyı kontrol et.
        """
        response = requests.get(f'{API_BASE_URL}/orders', headers=HEADERS)
        self.assertEqual(response.status_code, 200, 'API yanıtı 200 değil')
        
        orders = response.json()
        
        # Restoran içi olan ve arşivlenmemiş siparişleri sayıyoruz
        dinein_orders = [order for order in orders if order.get('orderType') == 'dinein' and not order.get('archived', False)]
        
        print(f'Restoran içi siparişleri: {len(dinein_orders)}')
        
        # Restoran içi siparişler var mı diye kontrol ediyoruz
        self.assertGreater(len(dinein_orders), 0, 'Restoran içi sipariş yok')


if __name__ == '__main__':
    unittest.main()
