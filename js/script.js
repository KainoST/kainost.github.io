document.addEventListener("DOMContentLoaded", function () {
  const images = [
    { src: 'kuvat/SalmonRed_KainoSalomo.png', category: 'digital', title: 'Salmon Red', year: '2023' },
    { src: 'kuvat/FEELINGLIKEANEMPTYROOM.jpg', category: 'digital', title: 'Feeling Like an Empty Room', year: '2024' },
    { src: 'kuvat/implicit_order.PNG', category: 'digital', title: 'Implicit Order', year: '2024', size: '61 x 51 cm' },
    { src: 'kuvat/StonedNotThatReal3000px.png', category: 'illustration', title: 'Stoned Statues - Not That Real', year: '2023', size: '5000 x 5000 pixels' },
    { src: 'kuvat/StonedStatuesAlbumArt3000px.png', category: 'illustration', title: 'Stoned Statues - Guardian', year: '2024', size: '5000 x 5000 pixels' },
    { src: 'kuvat/Sleeping_Genome_Kaino_Salomo.png', category: 'digital', title: 'Sleeping Genome', year: '2025', size: '100 x 80 cm' },
    { src: 'kuvat/SlowBreathClearSky.png', category: 'canvas', title: 'Slow Breath, Clear Sky', year: '2024', size: '24 x 33 cm' },
    { src: 'kuvat/OnceAgain.png', category: 'canvas', title: 'Once Again Accused of Clinging onto a Sunlit Puddle in 2011', year: '2024', size: '13 x 18 cm' },
    { src: 'kuvat/CharacterBuilderKainoSalomo.jpg', category: 'canvas', title: 'Character Builder', year: '2025', size: '54 x 65 cm' },
    { src: 'kuvat/Spoil.Frown.png', category: 'illustration', title: 'Spoil. - Frown', year: '2024', size: '5000 x 5000 pixels' },
    { src: 'kuvat/STONEDSTATUESDEBUT.png', category: 'illustration', title: 'Stoned Statues - Stoned Statues', year: '2022', size: '5000 x 5000 pixels' },
    { src: 'kuvat/SpringMiracle.png', category: 'digital', title: 'Miracle in a Spring Creek', year: '2024', size: '70 x 89 cm' },
    { src: 'kuvat/Spoil._AlbumArt_3000px.png', category: 'illustration', title: 'Spoil. - Universal Disappointment', year: '2024', size: '5000 x 5000 pixels' }
  ];

  const gallery = document.getElementById('gallery');
  let lgInstance = null;

  function renderGallery(filteredImages) {
    gallery.innerHTML = ''; // Tyhjennä galleriakontti

    filteredImages.forEach(img => {
      const a = document.createElement('a');
      a.href = img.src;
      a.classList.add('gallery-item');
      a.setAttribute('data-sub-html', `<h4>${img.title}</h4><p>${img.year || ''}</p>`);
      
      const image = document.createElement('img');
      image.src = img.src;
      image.alt = img.title || '';
      
      // 🔽 Overlay-elementti
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      
      const overlayText = document.createElement('div');
      overlayText.classList.add('text');
      overlayText.innerHTML = `<h4>${img.title}</h4><p>${img.year}</p>`;
      
      overlay.appendChild(overlayText);
      a.appendChild(image);
      a.appendChild(overlay);
      gallery.appendChild(a);
      
    });

    // Käynnistä justifiedGallery
    $('#gallery').justifiedGallery({
      rowHeight: 300,
      margins: 20,
      captions: false, // käytämme omaa overlaytä
      lastRow: 'justify'
    }).on('jg.complete', function () {
      // Tuhoa vanha lightGallery-instanssi, jos on
      if (lgInstance) {
        lgInstance.destroy(true);
        lgInstance = null;
      }
      // Käynnistä lightGallery uudelleen
      lgInstance = lightGallery(gallery, {
        selector: '.gallery-item',
        thumbnail: true,
        zoom: true,
        download: false,
        mode: 'lg-fade',
        loop: true,
        escKey: true,
        controls: true,
      });
    });
  }

  // Alustuksena näytä kaikki kuvat
  renderGallery(images);

  // Filter-nappien eventit
  const buttons = document.querySelectorAll('.filter-menu button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');
      const filtered = filter === 'all' ? images : images.filter(img => img.category === filter);

      renderGallery(filtered);
    });
  });
});
