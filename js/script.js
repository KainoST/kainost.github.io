document.addEventListener("DOMContentLoaded", function () {
  // Add 'loading' class immediately when DOM is ready
  document.body.classList.add("loading");

  // Remove 'loading' class when everything (images, etc.) has fully loaded
  window.addEventListener("load", function () {
    document.body.classList.remove("loading");
  });

  const images = [
    { src: '../kuvat/SalmonRed_KainoSalomo.png', category: 'digital', title: 'Salmon Red', year: '2023' },
    { src: '../kuvat/FEELINGLIKEANEMPTYROOM.jpg', category: 'digital', title: 'Feeling Like an Empty Room', year: '2024' },
    { src: '../kuvat/implicit_order.jpg', category: 'digital', title: 'Implicit Order', year: '2024', size: '61 x 51 cm' },
    { src: '../kuvat/StonedNotThatReal3000px.png', category: 'illustration', title: 'Stoned Statues - Not That Real', year: '2023', size: '5000 x 5000 pixels' },
    { src: '../kuvat/StonedStatuesAlbumArt3000px.jpg', category: 'illustration', title: 'Stoned Statues - Guardian', year: '2024', size: '5000 x 5000 pixels' },
    { src: '../kuvat/Sleeping_Genome_low.jpg', category: 'digital', title: 'Sleeping Genome', year: '2025', size: '100 x 80 cm' },
    { src: '../kuvat/SlowBreathClearSky.png', category: 'canvas', title: 'Slow Breath, Clear Sky', year: '2024', size: '24 x 33 cm' },
    { src: '../kuvat/OnceAgain.png', category: 'canvas', title: 'Once Again Accused of Clinging onto a Sunlit Puddle in 2011', year: '2024', size: '13 x 18 cm' },
    { src: '../kuvat/CharacterBuilderKainoSalomo.jpg', category: 'canvas', title: 'Character Builder', year: '2025', size: '54 x 65 cm' },
    { src: '../kuvat/Spoil.Frown.png', category: 'illustration', title: 'Spoil. - Frown', year: '2024', size: '5000 x 5000 pixels' },
    { src: '../kuvat/STONEDSTATUESDEBUT.jpg', category: 'illustration', title: 'Stoned Statues - Stoned Statues', year: '2022', size: '5000 x 5000 pixels' },
    { src: '../kuvat/Spring_miracle_in_a_creek_low.jpg', category: 'digital', title: 'Miracle in a Spring Creek', year: '2024', size: '70 x 89 cm' },
    { src: '../kuvat/Spoil._AlbumArt_3000px.jpg', category: 'illustration', title: 'Spoil. - Universal Disappointment', year: '2024', size: '5000 x 5000 pixels' }
  ];

  const gallery = document.getElementById('gallery');
  let lgInstance = null;

  function renderGallery(filteredImages) {
    gallery.innerHTML = ''; // Clear gallery container

    filteredImages.forEach(img => {
      const a = document.createElement('a');
      a.href = img.src;
      a.classList.add('gallery-item');
      a.setAttribute('data-sub-html', `<h4>${img.title}</h4><p>${img.year || ''}</p>`);

      const image = document.createElement('img');
      image.src = img.src;
      image.alt = img.title || '';

      // Overlay element
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');

      const overlayText = document.createElement('div');
      overlayText.classList.add('overlay-text');
      overlayText.innerHTML = `<div class="title">${img.title}</div><div class="year">${img.year}</div>`;

      overlay.appendChild(overlayText);
      a.appendChild(image);
      a.appendChild(overlay);

      gallery.appendChild(a);
    });

    // Initialize justifiedGallery
    $('#gallery').justifiedGallery({
      rowHeight: 300,
      margins: 20,
      captions: false, // using custom overlay
      lastRow: 'justify'
    }).on('jg.complete', function () {
      // Destroy previous lightGallery instance if exists
      if (lgInstance) {
        lgInstance.destroy(true);
        lgInstance = null;
      }
      // Initialize lightGallery again
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

  // Initially show all images
  renderGallery(images);

  // Filter button events
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
