class DropDown {

    constructor(data) {
        this.data = data;
        this.targets = [];
    }

    dataFilter(fillterSbgArray) {
        return this.data.filter(r => fillterSbgArray.every((item, i) => item === r[i]));
    }

    cariNilaiUnik(dataSbgArray, index) {
        const pilihanUnik = new Set();
        dataSbgArray.forEach(r => pilihanUnik.add(r[index]));
        return [...pilihanUnik];
    }

    populateDropDown(el, listSbgArray) {
        el.innerHTML = '';
        listSbgArray.forEach(item => {
            const option = document.createElement('option');
            option.textContent = item;
            el.appendChild(option);
    });
    }

    createPopulateDropDownFunction(el, elmBerdasarkan) {
        return () => {
            const elmBerdasarkanNilai = elmBerdasarkan.length === 0 ? null : elmBerdasarkan.map(depEl => depEl.value);
            const dataDipakai =elmBerdasarkan.length === 0 ? this.data : this.dataFilter(elmBerdasarkanNilai);
            const listDipakai = this.cariNilaiUnik(dataDipakai, elmBerdasarkan.length);
            this.populateDropDown(el, listDipakai);
        }
    }

    add(options) {
        // {target: 'level1', tergantungPada: []}
        const el = document.getElementById(options.target);
        const elmBerdasarkan = options.tergantungPada.length === 0 ? [] : options.tergantungPada.map(id => document.getElementById(id));
        const eventFunction = this.createPopulateDropDownFunction(el, elmBerdasarkan);
        const objectTarget = { el: el, elmBerdasarkan: elmBerdasarkan, func: eventFunction};
        objectTarget.elmBerdasarkan.forEach(depEl => depEl.addEventListener('change', eventFunction));
        this.targets.push(objectTarget);
        return this;

    }



    initialize() {
        this.targets.forEach(t => t.func());
        return this;
    }

    tambahDropdown(arrayBerdasarId) {
        arrayBerdasarId.forEach((item, i) => {
            const option = {target: item, tergantungPada: arrayBerdasarId.slice(0, i) };
            this.add(option);
        });
        this.initialize();
        return this; //mengembalikan nilai konsol
    }
}


var dataEmail = [
    ['- Pilih Provider -','- Pilih Daerah -','- Pilih Lokasi -','- Circuit ID -','- Site -','- Capacity -'],
    
    // Icon Plus
    ['Icon Plus','Seluma','Kominfo Seluma','01000087777 (IP VPN)','Kominfo Seluma, Talang Saling, Kabupaten Seluma, Bengkulu (100Mbps)(01000087777)','100 Mbps'],
    ['Icon Plus','Pati','Jontro','01000106666 (Metro-E)','CV. HAANSIRO, RT.4 RW.1 Desa Jontro, Kecamatan Wedarijaksa, Kabupaten Pati, Jawa Tengah (1 Gbps) (01000106666)','1 Gbps'],
    ['Icon Plus','Demak','Dempet','01000112405 (Metro-E)','Jl. Gajah-Dempet, RT.07/RW.04, Dempet, Kecamatan Dempet, Kabupaten Demak, Jawa Tengah 59573 (1 Gbps) (01000112405)','1 Gbps'],
    ['Icon Plus','Bengkalis','Mandau','01000085551 (Metro-E)','JL. Siak Gg Kuantan Duri-Riau, Kecamatan Mandau, Kabupaten Bengkalis, Riau, Indonesia (10 Mbps) (01000085551)','10 Mbps'],
    ['Icon Plus','Langkat','Tanjung Pura','01000098443 (Metro-E)','DUSUN 1 PENDIDIKAN DESA SERAPUH ASLI, Kecamatan Tanjung Pura, Kabupaten Langkat, Sumatera Utara, Indonesia, 20853 (1Gbps) (01000098443)','1 Gbps'],
    ['Icon Plus','Rembang','Pulo','01000134873 (Metro-E)','BENTUMAN BISTRO FOOD & DRINKS, Jl. KS Tubun, Ruko Pondok Permata No. 4 Sugihan, Desa Pulu, Rembang, Kabupaten Rembang, Jawa Tengah, Indonesia (1 Gbps) (01000134873)','1 Gbps'],
    ['Icon Plus','Rembang','Kragan','01000135650 (Metro-E)','Ds. Kebloran RT003/RW002, Kec. Kragan, Kabupaten Rembang, Jawa Tengah, lndonesia (1 Gbps) (01000135650)','1 Gbps'],
    ['Icon Plus','Tulungagung','Blitar','01000150372 (Metro-E)','Jl Raya Kunir,Krajan, Kunir, Wonodadi, Kabupaten Blitar, Jawa Timur, Indonesia  (1 Gbps) (01000142920 )','1 Gbps'],
    ['Icon Plus','Tulungagung','Kacangan','01000103972 (Metro-E)','RT 01 RW03/Dsn. Bendorubuh, Ds. Kacangan, Kec. Ngunut, Kab. Tulungagung, Jawa Timur 66292 (1 Gbps) (01000103972)','1 Gbps'],
    ['Icon Plus','Tulungagung','Trenggalek','01000124683 (Metro-E)','Jalan Gandusari - Kampak, RT.21/RW.6 ,Duren,Wonorejo, Gandusari, Kabupaten Trenggalek, Jawa Timur, 66372 (1 Gbps) (01000124683)','1 Gbps'],
    ['Icon Plus','Tulungagung','Sumbergempol','01000142915 (Metro-E)','Jln. Desa RT.01/RW.01 Somoteleng, Podorejo, Kec. Sumbergempol, Kabupaten Tulungagung, Jawa Timur, Indonesia (1 Gbps) (01000142915)','1 Gbps'],
    ['Icon Plus','Malang','Bantur','01000152771 (Metro-E)','Dusun Bantur Timur RT33/RW 07, Desa Bantur Kec Bantur,- ,Kabupaten Malang ,Jawa Timur ,Indonesia (1 Gbps) (01000152771)','1 Gbps'],
    ['Icon Plus','Malang','Pagak','01000124790 (Metro-E)','Dusun Judeg, RT.10/RW.03, Desa Tlogorejo, Kecamatan Pagak, Kabupaten Malang, Jawa Timur (2 Gbps) (01000124790)','1 Gbps'],
    ['Icon Plus','Ponorogo','Kauman','01000142923 (Metro-E)','Jl. Sidotopo 9A Kauman, Ponorogo, Jawa Timur, Yagan, Carat, Kabupaten Ponorogo, Jawa Timur, Indonesia (1 Gbps) (01000142923)','1 Gbps'],
    ['Icon Plus','Ponorogo','Kedung Banteng','01000150372 (Metro-E)','Dukuh.kalipucang, RT 01/RW 02, Desa. kedungbanteng, Kec. Sukorejo, Kab. Ponorogo, Jawatimur, Indonesia (1 Gbps) (01000150372)','1 Gbps'],

    // Indosat Oreedoo
    ['Indosat','Aceh','BIRUEN','DETH_MTX09482393_JKS_8535','BIRUEN','500 Mbps'],
    ['Indosat','Aceh','BIRUEN','DETH J-S-N BRN-ETR 210317','BIRUEN','1 Gbps'],
    ['Indosat','Kutai Timur','SANGATTA','DETH_MTX09482393_JKS_8866','SANGATTA','200 Mbps'],
    ['Indosat','Kutai Timur','PINRANG','DETH J-S-N PIN-ETR 210247','PINRANG','1 Gbps'],
    ['Indosat','Kutai Timur','POLEWALI','DETH J-S-N PLW-ETR 210466','POLEWALI','1 Gbps'],

    // Fiberstar
    ['Fiberstar','Pati','Jontro','CRT2104003077','PATI','10 Gbps'],
    ['Fiberstar','Demak','Pop Kudus','CRT2104009744','DEMAK','8 Gbps'],
    ['Fiberstar','Ngawi','Ngawi','CRT2009005413','NGAWI','2 Gbps'],
    ['Fiberstar','Kediri','Kediri','CRT2010001796','KEDIRI','2 Gbps'],
    ['Fiberstar','Malang','Sumberpucung','CRT2104003075','MALANG','3 Gbps'],
    ['Fiberstar','Bali','Gianyar','CRT2104009127','BALI','1 Gbps'],
    ['Fiberstar','Ungaran','Salatiga','CRT2108009824','UNGARAN','500 Mbps'],
    ['Fiberstar','Rembang','Rembang','CRT2109008642','REMBANG','2 Gbps'],

    //Xl Axiata
    ['XL Axiata','Demak','Bintoro','004C6714L2','DEMAK','1 Gbps'],
    ['XL Axiata','Demak','Purwodadi','004C6714L13,004C6714L14,004C6714L15','PURWODADI','3 Gbps'],
    ['XL Axiata','Pati','Jonto','004C6714L3','PATI','3 Gbps'],
    ['XL Axiata','Lumajang','Pasirian','020C6714L1','LUMAJANG','2 Gbps'],
    ['XL Axiata','Lombok','Mataram','020C6714L2','MATARAM','500 Mbps'],
    ['XL Axiata','Lombok','Pohgading','020C6714L3','POHGADING','500 Mbps'],
    ['XL Axiata','Lombok','Praya','020C6714L4','PRAYA','500 Mbps'],
    ['XL Axiata','Lombok','Kayangan','020C6714L5','KAYANGAN','500 Mbps'],
    ['XL Axiata','Lombok','Aikmel','020C6714L7','AIKMEL','500 Mbps'],
    ['XL Axiata','Lombok','Pancor','004C6714L1','PANCOR','2 Gbps'],
    ['XL Axiata','Lombok','Narmada','*****','NARMADA','*****'],
    ['XL Axiata','Lombok','Kedome','*****','KEDOME','*****'],
    ['XL Axiata','Lombok','Kopang','*****','KOPANG','*****'],
    ['XL Axiata','Lombok','Sambalia','*****','SAMBALIA','*****'],
    ['XL Axiata','Blora','Cepu','004C6714L4','BLORA','1 Gbps'],
    ['XL Axiata','Blora','Ngawen','004C6714L10','BLORA','1 Gbps'],
    ['XL Axiata','Rembang','Lasem','004C6714L6','REMBANG','1 Gbps'],
    ['XL Axiata','Kutai Timur','Sangatta','020C6714L6','SANGATTA','1 Gbps'],
    ['XL Axiata','Lamongan','Lamongan','004C6714L7','LAMONGAN','1 Gbps'],
    ['XL Axiata','Semarang','Semarang','020C6714L9','SEMARANG','500 Mbps'],
    ['XL Axiata','Probolinggo','Probolinggo','004C6714L8','PROBOLINGGO','1 Gbps'],
    ['XL Axiata','Bengkalis','Bengkalis','020C6714L10','BENGKALIS','1 Gbps'],
    ['XL Axiata','Tuban','Tuban','004C6714L11','TUBAN','1 Gbps'],

    // Hutcison Tri (H3I)
    ['H3I','Tulungagung','Blitar','LCA_JSN_JKT_BLT_001','BLITAR','1 Gbps'],

    // Moratel
    ['Moratel','Jakarta','Jakarta','3449041300059224','JAKARTA','2 Gbps'],

    // Fibernet
    ['Fibernet','Jakarta','Depok','IS154020','JAKARTA','300 Mbps'],
    ['Fibernet','Jakarta','Johar Baru','IS14A42','JAKARTA','1 Gbps'],

];



// Berhasil Perfect
// var dd = new DropDown(dataEmail)
// .add({target: 'level1', tergantungPada: []})
// .add({target: 'level2', tergantungPada: ['level1']})
// .add({target: 'level3', tergantungPada: ['level1','level2']})
// .initialize();

var dd = new DropDown(dataEmail).tambahDropdown(['level1','level2','level3','level4','level5','level6']);

var dataMetro = [
    ['Jawa Tengah','Pati','Kayen','Boloagung','Demangan'],
    ['Jawa Tengah','Pati','Trangkil','Pasucen','Gandong'],
    ['Jawa Timur','Sidoarjo','Jetak','soloyan'],
    ['Jawa Timur','Sidoarjo','Jetak','test'],
    ['Jawa Timur','Malang','Bantur','test2'],
    ['Jawa Timur','Malang','Pagak','test3'],
];


// var dd2 = new DropDown(dataMetro);
// dd2.add({target: 't1', tergantungPada: []});
// dd2.add({target: 't2', tergantungPada: ['t1']});
// dd2.add({target: 't3', tergantungPada: ['t1','t2']});
// dd2.add({target: 't4', tergantungPada: ['t1','t2','t3']});
// dd2.add({target: 't5', tergantungPada: ['t1','t2','t3','t4']});
// dd2.initialize();


// var dd2 = new DropDown(dataMetro).tambahDropdown(['t1','t2','t3','t4']);