const React = require('react');
const { render, screen, waitFor } = require('@testing-library/react');
const MenuPage = require('./pages/MenuPage');
const axios = require('axios');

// Axios'u mock'luyoruz
jest.mock('axios', () => ({
  get: jest.fn(),
}));


test('MenuPage renders and fetches categories successfully', async () => {
  // Mock API cevabı
  axios.get.mockResolvedValue({
    data: [
      { _id: '1', name: 'Hauptgerichte', subcategories: [] },
      { _id: '2', name: 'Beilagen', subcategories: [] },
    ],
  });

  // Bileşeni render ediyoruz
  render(<MenuPage />);

  // Menü başlığının olduğunu kontrol ediyoruz
  expect(screen.getByText('Speisekarte')).toBeInTheDocument();

  // Kategorilerin yüklenmesini bekliyoruz
  await waitFor(() => {
    expect(screen.getByText('Hauptgerichte')).toBeInTheDocument();
    expect(screen.getByText('Beilagen')).toBeInTheDocument();
  });
});

