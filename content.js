// Funkce pro odstranění blolace tisku
function removePrintStyle() {
  const styles = document.querySelectorAll('style');
  styles.forEach(style => {
    if (style.innerHTML.includes('@media print')) {
      style.remove();
    }
  });
  console.log("Blokace tisku zabráněna.");
}

// Funkce pro úpravu URL adresy pro stahování
function modifyDownloadLink() {
  const thElements = document.querySelectorAll('th.tg-sq88s');
  thElements.forEach(th => {
    const links = th.querySelectorAll('a');
    links.forEach(link => {
      if (link.href === "https://studijni-svet.cz/moznosti-stahovani/") {
        // Upravení URL adresy na přesměrování na tisk
        link.href = "javascript:window.print()";
        link.removeAttribute("target");
        console.log(`Změněna URL adresa: ${link}`);
      }
    });
  });
}

// Funkce pro odstranění zbytečných bloků kódu
function removeCodeBlocks() {
  const codeBlocks = document.querySelectorAll('.code-block.code-block-33, .code-block.code-block-34, img.alignleft.wp-image-104, img.alignnone.wp-image-11, .inside-left-sidebar, .tg-sq8s');
  codeBlocks.forEach(block => {
    block.remove();
    console.log("Odstraněn blok:", block);
  });
}

// Funkce pro odstranění zbytečných mezer
function removeEmptySpaces() {
  let removedSpacesCount = 0;
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(paragraph => {
    if (paragraph.childNodes.length === 1 && (paragraph.innerHTML.trim() === '&nbsp;' || paragraph.innerHTML.trim() === '<strong>&nbsp;</strong>')) {
      paragraph.remove();
      removedSpacesCount++;
    }
  });
  if (removedSpacesCount > 0)
    {
      console.log(`Odstraněno ${removedSpacesCount} zbytečných mezer.`);
    }
}

// Inicializace MutationObserveru - dynamické načítání stránky
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      modifyDownloadLink();
      removeCodeBlocks();
      removeEmptySpaces();
    }
  });
});

// Nastavení MutationObserveru
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Spuštění rozšíření
window.addEventListener('load', () => {
  console.log("Stránka načtena, jde se editovat :D");
  removePrintStyle();
  modifyDownloadLink();
  removeCodeBlocks();
  removeEmptySpaces();
});
