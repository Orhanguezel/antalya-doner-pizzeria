const categories = [
    {
      name: 'getraenke',
      description: 'Unsere Auswahl an Getränken.',
      subcategories: [
        {
          name: 'alkoholischeGetraenke',
          description: 'Unsere Auswahl an alkoholischen Getränken.',
          images: ['/assets/menu/38.jpg', '/assets/menu/39.jpg'],
          items: [
            {
              nr: '123',
              type: 'drink',
              name: 'Malzbier',
              zusatztoffe: [],
              allergene: [],
              description: '0,33L',
              prices: { default: 2.50 },
              extras: { extraKäse: 0.50 }
            },
            // Diğer itemler buraya eklenecek
          ]
        },
        {
          name: 'alkoholfreieGetraenke',
          description: 'Unsere Auswahl an alkoholfreien Getränken.',
          images: ['/assets/menu/42.jpg', '/assets/menu/43.jpg'],
          items: [
            {
              nr: '128',
              type: 'drink',
              name: 'Cola',
              zusatztoffe: [1, 10],
              allergene: [],
              description: 'Cola 0,33L',
              prices: { default: 2.00 },
              extras: { extraKäse: 0.50 }
            },
            // Diğer itemler buraya eklenecek
          ]
        }
      ]
    }
  ];
  
  module.exports = categories;
  