# Aplikace pro Předpověď Počasí

Tato aplikace pro předpověď počasí umožňuje uživatelům zadat město a zobrazit předpověď počasí na pět dní dopředu. Aplikace využívá API OpenWeatherMap a byla vytvořena pomocí Reactu.

- **Zobrazení Předpovědi Počasí:** Uživatel zadá název města a aplikace zobrazí předpověď teploty na pět dní.
- **Našeptávač pro Města:** Aplikace obsahuje dynamický seznam měst (datalist), ze kterého si uživatel může vybírat při psaní názvu města.
- **Zpracování Chyb:** Pokud se vyskytnou problémy s načítáním dat (např. město nebylo nalezeno), zobrazí se chybová zpráva.
- **Zobrazení jako Graf:** Předpověď se může zobrazit jako graf. Byla použita knihovna třetí strany Chart.js.

## Použité Technologie
- **React:** Pro vytváření uživatelského rozhraní.
- **OpenWeatherMap API:** Pro získávání aktuálních dat o počasí.
- **CSS:** Pro stylování aplikace.

## Požadavky

- **Node.js** a **npm** (pro spuštění aplikace)
- **API klíč** pro OpenWeatherMap

## Instalace

1. Naklonujte tento repozitář do vašeho lokálního zařízení:
   ```bash
   git clone https://github.com/vase-uzivatelske-jmeno/predpoved-pocasi.git
2. Přesuňte se do složky projektu:
cd predpoved-pocasi
3. Nainstalujte závislosti:
npm install
4. Vytvořte soubor `.env` v kořenovém adresáři projektu a přidejte svůj API klíč pro OpenWeatherMap:
REACT_APP_OPENWEATHERMAP_API_KEY=Váš_API_Klíč

## Spuštění Aplikace

Aplikaci spustíte následujícím příkazem:<br />
npm start<br />
Aplikace by měla být dostupná na adrese `http://localhost:3000`.

## Struktura Projektu 
- **public/:** Obsahuje statické soubory a hlavní `index.html`.
- **src/:** Obsahuje zdrojový kód aplikace.
- **components/TemperatureChart.js:** Komponenta pro vykreslení grafu.
- **App.js:** Hlavní komponenta Reactu, která zajišťuje načítání počasí a vykreslování komponent.
- **App.css:** CSS stylování pro aplikaci.
- **city.list.json:** Soubor s daty měst pro datalist.
- **.env:** Soubor s vaším API klíčem (není zahrnut ve verzi git).

**Použití**<br />
1. Do vstupního pole zadejte název města (např. "Praha, CZ").
2. Vyberte město ze seznamu návrhů.
3. Aplikace automaticky načte a zobrazí předpověď počasí pro následujících 5 dní a graf.

**Licence**<br />
Tento projekt je licencován pod licencí MIT. Podrobnosti naleznete v souboru LICENSE.
