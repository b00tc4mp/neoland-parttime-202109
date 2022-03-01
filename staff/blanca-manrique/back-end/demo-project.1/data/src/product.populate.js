const Product = require('./product')

Product.cache()
    .then(() => {
        const NikonZ9 = new Product({ id: 'ZQ7652-100', name: 'Nikon Z 9', price: '$2469', description: 'Nikon Z 9', image: 'https://cdn.nikoneurope.com/imported/images/web/EU/products/digital-cameras/mirrorless/z9/images/Z9_24_70_2.8_front__Get_Original_.png', category: 'cameras', quantity: 5, createdAt: '2020-01-01', updatedAt: '2020-01-01' })
        const NikonZfc = new Product({ id: 'ZQ7653-110', name: 'Nikon Z fc', price: '$2365', description: 'Nikon Z fc', image: 'https://cdn.nikoneurope.com/imported/images/web/EU/products/digital-cameras/mirrorless/zfc/images/nikon_z_fc_16_50_dx_3.5_6.3_front__Get_Original_.png', category: 'cameras', quantity: 3, createdAt: '2020-02-01', updatedAt: '2020-02-01' })
        const NikonZ5 = new Product({ id: 'ZQ7682-025', name: 'Nikon Z 5', price: '$3888', description: 'Nikon Z 5', image: 'https://cdn.nikoneurope.com/imported/images/web/EU/products/digital-cameras/mirrorless/z5/images/Z5_24-50_4-6.3_front--original.png', category: 'cameras', quantity: 10, createdAt: '2020-01-03', updatedAt: '2020-01-03' })
        const NikonZ50 = new Product({ id: 'ZQ7629-730', name: 'Nikon Z 50', price: '$2798', description: 'Nikon Z 50', image: 'https://cdn.nikoneurope.com/imported/images/web/EU/products/digital-cameras/mirrorless/z50/images/nikon_z50_16-50_dx_3.5-6.3_front--original.png', category: 'cameras', quantity: 7, createdAt: '2020-01-04', updatedAt: '2020-01-04' })
        const NikonZ7ll = new Product({ id: 'ZQ8851-050', name: 'Nikon Z 7ll', price: '$2957', description: 'Nikon Z 7ll', image: 'https://cdn.nikoneurope.com/imported/images/web/EU/products/digital-cameras/mirrorless/z7ii/images/Z7II_24_70_4_front_original.png', category: 'cameras', quantity: 25, createdAt: '2020-05-01', updatedAt: '2020-05-01' })
        const NikonD6 = new Product({ id: 'DQ9823-852', name: 'Nikon D 6', price: '$1986', description: 'Nikon D 6', image: 'https://cdn.nikoneurope.com/imported/images/web/EU/products/digital-cameras/dslr/D6/images/nikon_d6_front_hero_24-70mm_vr--original.png', category: 'cameras', quantity: 30, createdAt: '2020-06-01', updatedAt: '2020-06-01' })
        const NikonD780 = new Product({ id: 'DQ0090-789', name: 'Nikon D 780', price: '$2997', description: 'Nikon D 780', image: 'https://cdn.nikoneurope.com/imported/images/web/EU/products/digital-cameras/dslr/D780/images/D780_24_120_4_front--original.png', category: 'cameras', quantity: 2, createdAt: '2020-05-06', updatedAt: '2020-05-06' })
        const NikonD7500 = new Product({ id: 'DQ9995-113', name: 'Nikon D 7500', price: '$1464', description: 'Nikon D 7500', image: 'https://cdn.nikoneurope.com/imported/images/web/EU/products/digital-cameras/dslr/D7500/PPDDs/nikon_dslr_d7500_0022_D7500_18_140_front_category_page--original.png', category: 'cameras', quantity: 60, createdAt: '2020-05-02', updatedAt: '2020-05-02' })
        const NikonCoolPixB500 = new Product({ id: 'BQ1108-367', name: 'Nikon Cool Pix B 500', price: '$933', description: 'Nikon Cool Pix B 500', image: 'https://cdn.nikoneurope.com/imported/images/web/EU/products/digital-cameras/coolpix/b500/nikon_coolpix_compact_camera_b500_red_hero--original.png', category: 'cameras', quantity: 10, createdAt: '2020-08-02', updatedAt: '2020-08-02' })
        const NikonCoolPixP1000 = new Product({ id: 'BQ2080-021', name: 'Nikon Cool Pix P 1000', price: '$1070', description: 'Nikon Cool Pix P 1000', image: 'https://cdn.nikoneurope.com/imported/images/web/EU/products/digital-cameras/coolpix/p1000/new-ppdds/nikon_cpx_p1000_black_hero_shot--original.png', category: 'cameras', quantity: 100, createdAt: '2020-05-07', updatedAt: '2020-05-07' })

        return Promise.all([NikonZ9.save(), NikonZfc.save(), NikonZ5.save(), NikonZ50.save(), NikonZ7ll.save(), NikonD6.save(), NikonD780.save(), NikonD7500.save(), NikonCoolPixB500.save(), NikonCoolPixP1000.save()])
    })
    .then(() => console.log('Products saved'))
    .catch(error => console.error(error))


