'use strict';

let show_results = true;
let url_stats = 'http://test.planteome.org/api/statistics/';
let url_amigo = 'http://test.planteome.org/amigo/';
let raw_graph_data = [];
let resultList = [];
let ontologyCategory ='';
let downloadContent = "";
var table;

function ontology(m_ontologyName, m_ontologyId,m_description, m_numberOfInput,m_numberOfReference,p){
	if(m_ontologyName === undefined)
		m_ontologyName='';
	if(m_ontologyId === undefined)
		m_ontologyId='';
	if(m_description === undefined)
		m_description='';
	if(m_numberOfInput === undefined)
		m_numberOfInput=0;
	if(m_numberOfReference === undefined)
		m_numberOfReference=0;
	if(p === undefined)
		p=0;

	this.ontologyId = JSON.parse(JSON.stringify(m_ontologyId));
	this.ontologyName = '';
	this.description = m_description;
	this.numberOfInput = m_numberOfInput;
	this.numberOfReference = m_numberOfReference;
	this.p = p;
	this.ontologyCategory = '';
}

function initialize(){

	function taxonFactory(name, id){
		let e = document.createElement('option');
		e.value = id;
		e.text = name;

		return e;
	}
	//initialize the species selet button

	let taxonList = [
		['Arabidopsis_thaliana', '3702'],
		['Aegilops_tauschii', '37682'],
		['Amborella_trichopoda', '13333'],
		['Arabidopsis_lyrata' , '59689'],
		['Arachis_duranensis', '130453'],
		['Arachis_ipaensis', '130454'],
	];

	/*
	   'Aegilops_tauschii', '37682',
	   'Amborella_trichopoda', '13333',
	   'Arabidopsis_lyrata' , '59689',
	   'Arabidopsis_thaliana', '3702',
	   'Arachis_duranensis', '130453',
	   'Arachis_ipaensis', '130454',

	   'Batrachochytrium_dendrobatidis', '109871',
	   'Brachypodium_distachyon', '15368',
	   'Brachypodium_sylvaticum.Corv', '29664',
	   'Brachypodium_sylvaticum.Greece', '29664',
	   'Brachypodium_sylvaticum.Spain', '29664',
	   'Brassica_oleracea', '3712',
	   'Brassica_rapa' ,'3711',
	   'Caenorhabditis_elegans', '6239',
	   'Cajanus_cajan', '3821',
	   'Cannabis_sativa.Purple.Kush', '3483',
	   'Capsella_rubella', '81985',
	   'Capsicum_annuum', '4072',
	   'Carica_papaya', '3649',
	   'Chlamydomonas_reinhardtii', '3055',
	   'Cicer_arietinum', '3827',
	   'Citrullus_lanatus', '3654',
	   'Citrus_clementina', '85681',
	   'Citrus_sinensis', '2711',
	   'Coffea_canephora', '49390',
	   'Cucumis_sativus', '3659',
	   'Danio_rerio', '7955',
	   'Drosophila_melanogaster', '7227',
	   'Ectocarpus_siliculosus', '2880',
	   'Elaphocordyceps_capitata', '45325',
	   'Elaphocordyceps_ophioglossoides', '71617',
	   'Elaphocordyceps_paradoxa', '94208',
	   'Epichloe_festucae', '35717',
	   'Escherichia_coli', '562',
	   'Eucalyptus_grandis', '71139',
	   'Fragaria_vesca', '57918',
	   'Fusarium_graminearum', '5518',
	   'Fusarium_oxysporum.4287', '660037',
	   'Fusarium_verticillioides', '117187',
	   'Gadus_morhua', '8049',
	   'Gasterosteus_aculeatus', '69293',
	   'Glycine_max', '3847',
	   'Gossypium_raimondii', '29730',
	   'Homo_sapiens', '9606',
	   'Hordeum_vulgare', '4513',
	   'Jatropha_curcas', '180498',
	   'Kalanchoe_laxiflora', '1670617',
	   'Laccaria_bicolor', '29883',
	   'Leersia_perrieri', '77586',
	   'Linum_usitatissimum', '4006',
	   'Magnaporthe_grissa', '148305',
	   'Malus_domestica', '3750',
	   'Manihot_esculenta', '3983',
	   'Medicago_truncatula', '3880',
	   'Mimulus_guttatus', '4155',
	   'Mus_musculus', '10090',
	   'Musa_acuminata', '4641',
	   'Nectria_haematococca', '140110',
	   'Nelumbo_nucifera', '4432',
	   'Neurospora_crassa', '5141',
	   'Nostoc_punctiforme', '272131',
	   'Oncorhynchus_mykiss', '8022',
	   'Oryza_australiensis', '4532',
	   'Oryza_barthii', '65489',
	   'Oryza_brachyantha', '4533',
	   'Oryza_glaberrima', '4538',
	   'Oryza_glumaepatula', '40148',
	   'Oryza_granulata', '110450',
	   'Oryza_kasalath', '4527',
	'Oryza_longistaminata', '4528',
		'Oryza_meridionalis', '40149',
		'Oryza_minuta', '63629',
		'Oryza_nivara', '4536',
		'Oryza_officinalis', '4535',
		'Oryza_punctata', '4537',
		'Oryza_rufipogon', '4529',
		'Oryza_sativa.indica.gramene', '39946',
		'Oryza_sativa.indica.iplant', '39946',
		'Oryza_sativa.indica.IR29', '39946',
		'Oryza_sativa.indica.pokkali', '39946',
		'Oryza_sativa.japonica.iplant', '39947',
		'Oryza_sativa.japonica.IRGSP', '39947',
		'Oryza_sativa.japonica.MSU', '39947',
		'Oryzias_latipes', '8090',
		'Pediculus_humanus', '121225',
		'Phaseolus_vulgaris', '3885',
		'Phoenix_dactylifera', '42345',
		'Phyllostachys_heterocycla', '38705',
		'Physcomitrella_patens', '3218',
		'Phytophthora_infestans', '4787',
		'Picea_abies', '3329',
		'Pinus_taeda', '3352',
		'Populus_trichocarpa', '3694',
		'Populus_trichocarpa.ver3', '3694',
		'Prunus_persica', '3760',
		'Rattus_norvegicus', '10116',
		'Rhizopus_oryzae', '64495',
		'Ricinus_communis', '3988',
		'Saccharomyces_cerevisiae', '4932',
		'Salvia_hispancia.salba', '49212',
		'Salvia_splendens', '180675',
		'Schizosaccharomyces_pombe', '4896',
		'Selaginella_moellendorffii', '88036',
		'Setaria_italica', '4555',
		'Solanum_lycopersicum', '4081',
		'Solanum_tuberosum', '4113',
		'Sorghum_bicolor', '4558',
		'Synechocystis_pcc6803', '1148',
		'Takifugu_rubripes', '31033',
		'Tetraodon_nigroviridis', '99883',
		'Theobroma_cacao', '3641',
		'Tolypocladium_inflatum', '29910',
		'Trichodesmium_erythraeum', '1206',
		'Triticum_aestivum', '4565',
		'Triticum_monococcum.DV92', '4568',
		'Triticum_monococcum.G3116', '4568',
		'Triticum_turgidum', '4571',
		'Triticum_urartu', '4572',
		'Vitis_vinifera', '29760',
		'Zea_mays', '4577',
		*/

	document.getElementById("help").innerHTML = 
	"Please input the accession ID of gene products. e.g.:<br/>"+
	"TAIR:locus:1005716561 <br/>"+
	"TAIR:locus:2031476<br/> " +
	"TAIR:locus:2043067<br/> " +
	"TAIR:locus:2044851<br/> " +
	"TAIR:locus:2012612<br/> " +
	"TAIR:locus:2027483<br/> " +
	"TAIR:locus:2202810<br/> " +
	"TAIR:locus:2037970<br/> " +
	"TAIR:locus:2018605<br/> " +
	"TAIR:locus:2200873<br/> " +
	"TAIR:locus:2195155<br/> " +
	"TAIR:locus:2031576<br/> " +
	"TAIR:locus:2031561<br/> " +
	"TAIR:locus:2040555<br/> " +
	"TAIR:locus:2061753<br/> " +
	"TAIR:locus:2039712<br/> " +
	"TAIR:locus:2052432<br/> " +
	"TAIR:locus:2054982<br/> " +
	"TAIR:locus:2094508<br/> " +
	"TAIR:locus:2085246<br/> " +
	"TAIR:locus:2084036<br/> " +
	"TAIR:locus:2100611<br/> " +
	"TAIR:locus:2124978<br/>"+
	"TAIR:locus:2117627     <br/>"+
	"TAIR:locus:2167042     <br/>"+
	"TAIR:locus:2153162     <br/>"+
	"TAIR:locus:2175841     <br/>"+
	"TAIR:locus:504954689   <br/>"+
	"TAIR:locus:2826195     <br/>"+
	"TAIR:locus:2193997     <br/>"+
	"TAIR:locus:2193997     <br/>"+
	"TAIR:locus:2058324     <br/>"+
	"TAIR:locus:2051229     <br/>"+
	"TAIR:locus:2828051     <br/>"+
	"TAIR:locus:2053501     <br/>"+
	"TAIR:locus:2049862     <br/>"+
	"TAIR:locus:2050756     <br/>"+
	"TAIR:locus:2078633     <br/>"+
	"TAIR:locus:2084988     <br/>"+
	"TAIR:locus:2084988     <br/>"+
	"TAIR:locus:2075735     <br/>"+
	"TAIR:locus:2080692     <br/>"+
	"TAIR:locus:2081546     <br/>"+
	"TAIR:locus:2079914     <br/>"+
	"TAIR:locus:2098821     <br/>"+
	"TAIR:locus:4515103291  <br/>"+
	"TAIR:locus:2117497     <br/>"+
	"TAIR:locus:2175428     <br/>"+
	"TAIR:locus:2180912     <br/>"+
	"TAIR:locus:2160452     <br/>"+
	"TAIR:locus:2152773     <br/>"+
	"TAIR:locus:2149579     <br/>"+
	"TAIR:locus:2159486     <br/>"+
	"TAIR:locus:504954705    <br/>"+
	"TAIR:locus:2185485      <br/>"+
	"TAIR:locus:504954755    <br/>"+
	"TAIR:locus:2201786      <br/>"+
	"TAIR:locus:2206300      <br/>"+
	"TAIR:locus:2042331      <br/>"+
	"TAIR:locus:2090285      <br/>"+
	"TAIR:locus:2123256      <br/>"+
	"TAIR:locus:2181216      <br/>"+
	"TAIR:locus:2168968      <br/>"+
	"TAIR:locus:2036546      <br/>"+
	"TAIR:locus:2036853      <br/>"+
	"TAIR:locus:2058939      <br/>"+
	"TAIR:locus:1005716578   <br/>"+
	"TAIR:locus:2094063      <br/>"+
	"TAIR:locus:2120618      <br/>"+
	"TAIR:locus:2157849      <br/>"+
	"TAIR:locus:2007422      <br/>"+
	"TAIR:locus:2033548      <br/>"+
	"TAIR:locus:2011962      <br/>"+
	"TAIR:locus:2011962      <br/>"+
	"TAIR:locus:2030280      <br/>"+
	"TAIR:locus:2030280      <br/>"+
	"TAIR:locus:2019627      <br/>"+
	"TAIR:locus:2199772      <br/>"+
	"TAIR:locus:2064801      <br/>"+
	"TAIR:locus:2064821      <br/>"+
	"TAIR:locus:2050620      <br/>"+
	"TAIR:locus:2078991      <br/>"+
	"TAIR:locus:2080492      <br/>"+
	"TAIR:locus:2080492      <br/>"+
	"TAIR:locus:2119515      <br/>"+
	"TAIR:locus:504954871    <br/>"+
	"TAIR:locus:2149443      <br/>"+
	"TAIR:locus:2164381      <br/>"+
	"TAIR:locus:2138743      <br/>"+
	"TAIR:locus:2138718      <br/>"+
	"TAIR:locus:2031895      <br/>"+
	"TAIR:locus:2065553      <br/>"+
	"TAIR:locus:2125274      <br/>"+
	"TAIR:locus:2166424      <br/>"+
	"TAIR:locus:2166424      <br/>"+
	"TAIR:locus:2028825      <br/>"+
	"TAIR:locus:2039410      <br/>"+
	"TAIR:locus:2065939      <br/>"+
	"TAIR:locus:2039109      <br/>"+
	"TAIR:locus:2097750      <br/>"+
	"TAIR:locus:2097658      <br/>"+
	"TAIR:locus:2089005      <br/>"+
	"TAIR:locus:2077715      <br/>"+
	"TAIR:locus:2137717      <br/>"+
	"TAIR:locus:2152840      <br/>"+
	"TAIR:locus:2148216      <br/>"+
	"TAIR:locus:2168586      <br/>"+
	"TAIR:locus:2007467      <br/>"+
	"TAIR:locus:2060837      <br/>"+
	"TAIR:locus:2826180      <br/>"+
	"TAIR:locus:2079777      <br/>"+
	"TAIR:locus:2135947      <br/>"+
	"TAIR:locus:2137380      <br/>"+
	"TAIR:locus:2143676      <br/>"+
	"TAIR:locus:2079797      <br/>"+
	"TAIR:locus:2155593      <br/>"+
	"TAIR:locus:1005716561   <br/>"+
	"TAIR:locus:2030482      <br/>"+
	"TAIR:locus:2196919      <br/>"+
	"TAIR:locus:2008698      <br/>"+
	"TAIR:locus:2205871      <br/>"+
	"TAIR:locus:2030648      <br/>"+
	"TAIR:locus:2036761      <br/>"+
	"TAIR:locus:2014574      <br/>"+
	"TAIR:locus:2031407      <br/>"+
	"TAIR:locus:2034250      <br/>"+
	"TAIR:locus:2057243      <br/>"+
	"TAIR:locus:2066185      <br/>"+
	"TAIR:locus:2043818      <br/>"+
	"TAIR:locus:2055552      <br/>"+
	"TAIR:locus:1009023243   <br/>"+
	"TAIR:locus:2080717      <br/>"+
	"TAIR:locus:2088743      <br/>"+
	"TAIR:locus:2103391      <br/>"+
	"TAIR:locus:2099192      <br/>"+
	"TAIR:locus:2122940      <br/>"+
	"TAIR:locus:2122975      <br/>"+
	"TAIR:locus:2127948      <br/>"+
	"TAIR:locus:2126377      <br/>"+
	"TAIR:locus:2160722      <br/>"+
	"TAIR:locus:2183394      <br/>"+
	"TAIR:locus:2148052      <br/>"+
	"TAIR:locus:2167761      <br/>"+
	"TAIR:locus:2153358      <br/>"+
	"TAIR:locus:2152541      <br/>"+
	"TAIR:locus:2152541      <br/>"+
	"TAIR:locus:2152556      <br/>"+
	"TAIR:locus:2152556      <br/>"+
	"TAIR:locus:2151656      <br/>"+
	"TAIR:locus:2046901      <br/>"+
	"TAIR:locus:2046901      <br/>"+
	"TAIR:locus:2053573      <br/>"+
	"TAIR:locus:2079379      <br/>"+
	"TAIR:locus:2130080      <br/>"+
	"TAIR:locus:2140005      <br/>"+
	"TAIR:locus:2140005      <br/>"+
	"TAIR:locus:2170174      <br/>"+
	"TAIR:locus:2158626      <br/>"+
	"TAIR:locus:505006113    <br/>"+
	"TAIR:locus:505006113    <br/>"+
	"TAIR:locus:2034516      <br/>"+
	"TAIR:locus:2196287      <br/>"+
	"TAIR:locus:2016099      <br/>"+
	"TAIR:locus:2016099      <br/>"+
	"TAIR:locus:2049470      <br/>"+
	"TAIR:locus:1005716545   <br/>"+
	"TAIR:locus:1005716545   <br/>"+
	"TAIR:locus:2129500      <br/>"+
	"TAIR:locus:2129500      <br/>"+
	"TAIR:locus:2116422      <br/>"+
	"TAIR:locus:2145382      <br/>"+
	"TAIR:locus:2145382      <br/>"+
	"TAIR:locus:2163946      <br/>"+
	"TAIR:locus:2116422      <br/>"+
	"TAIR:locus:2163011      <br/>"+
	"TAIR:locus:2174160      <br/>"+
	"TAIR:locus:2194559      <br/>"+
	"TAIR:locus:2032382      <br/>"+
	"TAIR:locus:2025956      <br/>"+
	"TAIR:locus:2020563      <br/>"+
	"TAIR:locus:2117512      <br/>"+
	"TAIR:locus:2174567      <br/>"+
	"TAIR:locus:2194559      <br/>"+
	"TAIR:locus:2032382      <br/>"+
	"TAIR:locus:2025956      <br/>"+
	"TAIR:locus:2020563      <br/>"+
	"TAIR:locus:2193977      <br/>"+
	"TAIR:locus:2091995      <br/>"+
	"TAIR:locus:4515102612   <br/>"+
	"TAIR:locus:2038786      <br/>"+
	"TAIR:locus:2055600      <br/>"+
	"TAIR:locus:2083579      <br/>"+
	"TAIR:locus:2136393      <br/>"+
	"TAIR:locus:2024740      <br/>"+
	"TAIR:locus:2024745      <br/>"+
	"TAIR:locus:2018329      <br/>"+
	"TAIR:locus:2010657      <br/>"+
	"TAIR:locus:2207225      <br/>"+
	"TAIR:locus:2033092      <br/>"+
	"TAIR:locus:2033092      <br/>"+
	"TAIR:locus:2033097      <br/>"+
	"TAIR:locus:2205135      <br/>"+
	"TAIR:locus:2201806      <br/>"+
	"TAIR:locus:2036024      <br/>"+
	"TAIR:locus:2012350      <br/>"+
	"TAIR:locus:2012763      <br/>"+
	"TAIR:locus:2197364      <br/>"+
	"TAIR:locus:2027352      <br/>"+
	"TAIR:locus:2008960      <br/>"+
	"TAIR:locus:2205314      <br/>"+
	"TAIR:locus:2006872      <br/>"+
	"TAIR:locus:2036194      <br/>"+
	"TAIR:locus:2194075      <br/>"+
	"TAIR:locus:2027453      <br/>"+
	"TAIR:locus:2035030      <br/>"+
	"TAIR:locus:2016392      <br/>"+
	"TAIR:locus:2013134      <br/>"+
	"TAIR:locus:2198581      <br/>"+
	"TAIR:locus:2201138      <br/>"+
	"TAIR:locus:505006138    <br/>"+
	"TAIR:locus:2028862      <br/>"+
	"TAIR:locus:2199917      <br/>"+
	"TAIR:locus:2032357      <br/>"+
	"TAIR:locus:2200660      <br/>"+
	"TAIR:locus:2202805      <br/>"+
	"TAIR:locus:2205774      <br/>"+
	"TAIR:locus:2016004      <br/>"+
	"TAIR:locus:2196899      <br/>"+
	"TAIR:locus:2029954      <br/>"+
	"TAIR:locus:2013628      <br/>"+
	"TAIR:locus:2015726      <br/>"+
	"TAIR:locus:2034522      <br/>"+
	"TAIR:locus:2031735      <br/>"+
	"TAIR:locus:2031740      <br/>"+
	"TAIR:locus:2038031      <br/>"+
	"TAIR:locus:2006892      <br/>"+
	"TAIR:locus:2012728      <br/>"+
	"TAIR:locus:2008129      <br/>"+
	"TAIR:locus:2017597      <br/>"+
	"TAIR:locus:2009665      <br/>"+
	"TAIR:locus:2197061      <br/>"+
	"TAIR:locus:2020018      <br/>"+
	"TAIR:locus:2011045      <br/>"+
	"TAIR:locus:2205682      <br/>"+
	"TAIR:locus:2020492      <br/>"+
	"TAIR:locus:2012050      <br/>"+
	"TAIR:locus:2027605      <br/>"+
	"TAIR:locus:2206520      <br/>"+
	"TAIR:locus:2025961      <br/>"+
	"TAIR:locus:2010796      <br/>"+
	"TAIR:locus:2202334      <br/>"+
	"TAIR:locus:2020638      <br/>"+
	"TAIR:locus:2020628      <br/>"+
	"TAIR:locus:2027290      <br/>"+
	"TAIR:locus:2018416      <br/>"+
	"TAIR:locus:2196020      <br/>"+
	"TAIR:locus:2195955      <br/>"+
	"TAIR:locus:2029471      <br/>"+
	"TAIR:locus:2032130      <br/>"+
	"TAIR:locus:2037543      <br/>"+
	"TAIR:locus:2206400      <br/>"+
	"TAIR:locus:2016214      <br/>"+
	"TAIR:locus:2041160      <br/>"+
	"TAIR:locus:2054090      <br/>"+
	"TAIR:locus:2046931      <br/>"+
	"TAIR:locus:2046911      <br/>"+
	"TAIR:locus:2042634      <br/>"+
	"TAIR:locus:2053114      <br/>"+
	"TAIR:locus:2051930      <br/>"+
	"TAIR:locus:2051426      <br/>"+
	"TAIR:locus:2050019      <br/>"+
	"TAIR:locus:2049319      <br/>"+
	"TAIR:locus:2060415      <br/>"+
	"TAIR:locus:2059155      <br/>"+
	"TAIR:locus:2047565      <br/>"+
	"TAIR:locus:2046688      <br/>"+
	"TAIR:locus:2059531      <br/>"+
	"TAIR:locus:2050286      <br/>"+
	"TAIR:locus:2057366      <br/>"+
	"TAIR:locus:2057442      <br/>"+
	"TAIR:locus:2046163      <br/>"+
	"TAIR:locus:2065724      <br/>"+
	"TAIR:locus:504955915    <br/>"+
	"TAIR:locus:2062545 <br/>" +
	"TAIR:locus:2060263 <br/>" +
	"TAIR:locus:2060211 <br/>" +
	"TAIR:locus:2060285 <br/>" +
	"TAIR:locus:2060216 <br/>" +
	"TAIR:locus:2046505 <br/>" +
	"TAIR:locus:2040864 <br/>" +
	"TAIR:locus:2044782 <br/>" +
	"TAIR:locus:2063494 <br/>" +
	"TAIR:locus:2058729 <br/>" +
	"TAIR:locus:2057946 <br/>" +
	"TAIR:locus:2061748 <br/>" +
	"TAIR:locus:2057145 <br/>" +
	"TAIR:locus:2064163 <br/>" +
	"TAIR:locus:2039697 <br/>" +
	"TAIR:locus:2063947 <br/>" +
	"TAIR:locus:2063078 <br/>" +
	"TAIR:locus:2058510 <br/>" +
	"TAIR:locus:2041036 <br/>" +
	"TAIR:locus:2040976 <br/>" +
	"TAIR:locus:2050847 <br/>" +
	"TAIR:locus:2043358 <br/>" +
	"TAIR:locus:2102082 <br/>" +
	"TAIR:locus:2074572 <br/>" +
	"TAIR:locus:2097700 <br/>" +
	"TAIR:locus:2103040 <br/>" +
	"TAIR:locus:2082450 <br/>" +
	"TAIR:locus:2081071 <br/>" +
	"TAIR:locus:2098545 <br/>" +
	"TAIR:locus:2079661 <br/>" +
	"TAIR:locus:2091122 <br/>" +
	"TAIR:locus:2085089 <br/>" +
	"TAIR:locus:2103192 <br/>" +
	"TAIR:locus:2087695 <br/>" +
	"TAIR:locus:2087964 <br/>" +
	"TAIR:locus:2086370 <br/>" +
	"TAIR:locus:2094014 <br/>";

	let e_species = document.querySelector('#species');
	for(let t of taxonList){
		e_species.appendChild(taxonFactory(t[0],t[1]));
	}
	
	let x = document.getElementById("ontologyCategory").value;
	ontologyCategory = x;
	
	
	$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
		// ( settings.url == "ajax/missing.html" ) {
			console.log(event);
			console.log(jqxhr);
			console.log(settings);
			console.log(thrownError);
			showError("Sorry, there is something wrong with the server and we are trying to solve it...");
		//}
	});
	
	$(document).ready(function(){
		table = $('#resultTable').DataTable();
	});
	
}

function my_submit(){
	
	function splitStringToGeneList(str){
		let geneIDList = [];
		let rex = /[\n\r\t]+/
		let inputData = str.split(rex);	// Split on carriage return
		
		//console.log(inputData);
		
		let x;
		for(x in inputData){
			let trimmedData = inputData[x].trim();
			if(trimmedData ==='')
				continue;

			geneIDList.push(trimmedData);
		}
		return geneIDList;
	}
	
	my_submitReset();
	initializeDownloadContent();
	show_results = true;
		
	let str_geneList = document.querySelector('#textarea_geneList').value;
	if( str_geneList == ''){
		alert('please input the interesting gene list');
		return false;
	}


	let referenceGenesNum;
	let inputGenes = splitStringToGeneList(str_geneList);
	let inputGenesNum = inputGenes.length;
	let cutoff = document.querySelector('#significance').value;

	$('#loading').show();

	$.when(getOverView(), getOntologyTermsFromGenes(inputGenes)).done(function(overview_data, ol_data){
		
		console.log("overview data:");
		console.log(overview_data);
		console.log("ontology list data:");
		console.log(ol_data);
		
		if(!show_results){
			console.log('cancelling terms request due to reset button');
			return false;
		}
		
		let summary = overview_data[0].data;
		referenceGenesNum = summary['gene-product-count'];
		document.querySelector('#result_summary').innerHTML = 'the number of input genes is: ' +
			inputGenesNum + ' <br> the number of background genes is: ' + referenceGenesNum + '<br>';

		//output the input information to download fileCreatedDate
		appendInputDesicription(inputGenesNum,referenceGenesNum);

		let ontologyList = ol_data[0].data['gene-to-term-summary-count'];

		$.when(getGenesNumInRefFromOntologys(ontologyList)).done(function(data, textStatus, jqXHR){
			if(!show_results){
				console.log('cancelling ref request due to reset button');
				return false;
			}
			
			console.log("Gene Nums Data");
			console.log(data);
			
			let ontologyListRef = data.data['term-to-gene-summary-count'];
			let test_sel = document.querySelector('#method').value;
			//console.log(test_sel);

			for(let ontology_ID in ontologyList){
				// K
				let numOfRefer = ontologyListRef[ontology_ID];
				// k
				let numOfInput = ontologyList[ontology_ID];
				// N
				let N = referenceGenesNum;
				// n
				let n = inputGenesNum;

				if(test_sel != 'chi-squared' && test_sel != 'hypergeometric'){
					if(numOfInput > 500 || numOfRefer > 500 || n > 500 || N > 500){
						console.log('should use chi or hypergeo for large numbers');
					}
				}

				let p = '';
				switch(test_sel){
					case 'hypergeometric':
						p = stats.hypergeometric(numOfInput,numOfRefer,n,N);
						break;
					case 'fisher':
						p = stats.fisher(numOfInput,numOfRefer,n,N);
						break;
					case 'chi-squared':
						p = stats.chi(numOfInput,numOfRefer,n,N);
						break;
					case 'fisher2':
						p = stats.fisher2(numOfInput,numOfRefer,n,N);
						break;
					default:
						break;
				}

				if(p > cutoff && !Number.isNaN(p))
					continue;


				let m_ontologyName;
				let m_description;
				let m_ontologyData = new ontology(m_ontologyName,ontology_ID, m_description, numOfInput, numOfRefer,p);
				resultList.push(JSON.parse(JSON.stringify(m_ontologyData)));
			}

			if(!show_results){
				console.log('cancelling table filling due to reset button');
				return false;
			}

			getOntologyData(resultList);
			console.log('analysis of data finished');
			
			if(resultList.length == 0){
				$('#loading').hide();
				showError("Sorry, there is something wrong with the server... We are fixing it and please come back in the future...")
			}
			//$('#results').show();
		});
	});
}

function my_submitReset(){
	$('#loading').hide();
	$('#results').hide();
	$('#downloadBtn').hide();
	$('#error').hide();
	
	//$('#result_table tr').remove();
	//$('#resultTable').DataTable();
	
	table.clear().draw();
	
	document.querySelector('#result_summary').innerHTML = '';

	//reset globals
	raw_graph_data = [];
	resultList = [];
}

function my_reset(){
	show_results = false;
	document.querySelector('#textarea_geneList').value = '';
	document.querySelector('#textarea_backgroundList').value = '';
	my_submitReset();
}

function onclick_QueryTypeChange(){
	let x = document.getElementById("queryType").value;
	if(x == 'userinput')
		   $('#referenceBackground').show();
	else
		   $('#referenceBackground').hide();
}

function onclick_ontologyCategoryChange(){
	let x = document.getElementById("ontologyCategory").value;
	ontologyCategory = x;
}

//get the overview information from server
function getOverView(){
	return $.ajax({
		type: 'get',
		url: url_stats + 'overview',
		dataType: 'json'
	})/* .fail(function(){
		alert("test");
		
	}) */;
}

function getOntologyTermsFromGenes(geneList){
	let link = url_stats + 'gene-to-term?';
	let data = '';

	for(let i of geneList){
		data +='bioentity='+i+'&';
	}
	data += 'taxon=3702';

	//console.log(link);

	return $.ajax({
		type: 'post',
		url: link,
		data: data,
		dataType: 'json'
	});
}

function getGenesNumInRefFromOntologys(ontologyList){
	let link = url_stats + 'term-to-gene?';
	let data = '';

	for(let i in ontologyList){
		data +='term='+i+'&';
	}
	data += 'taxon=3702';

	console.log("the send of term to genes");
	console.log(link);

	return $.ajax({
		type: 'post',
		url: link,
		data: data,
		dataType: 'json'
	});
}


function getOntologyData(resultList){
	
	var length = resultList.length;
	var count = 0;
	//append to table
	for(let i of resultList){
		let j = i;
		$.ajax({
			type: 'get',
			url: url_amigo + 'term/' + j.ontologyId + '/json',
			dataType: 'json',
			success: function(res){
				//console.log(res);

				let name = res.results.name;
				let des = res.results.definition;
				let category = res.results.ontology;
				
				j.ontologyName = name;
				j.description = des;
				j.ontologyCategory = category;
				
				if(ontologyCategory=='all' || category ==ontologyCategory){
					appendOntologyToTable(j);
					appendOntologyToDownload(j);
				}

				//data for visualization
				raw_graph_data.push(res.results.topology_graph_json);
				
				
				// "topology_graph_json" :
				//ontology: JSON blob form of the local relation transitivity graph. Uses various relations (including regulates, occurs in, capable_of).
				
				//"regulates_transitivity_graph_json"
				//ontology: JSON blob form of all immediate neighbors of the term.
				
				//"neighborhood_graph_json" 
				//ontology: JSON blob form of all immediate neighbors of the term; in the case that there are too many neighbors to transport, the number will be artificially reduced.
				
				//"neighborhood_limited_graph_json" 
				//ontology: Only in taxon.
    

/* 				if(raw_graph_data.length == resultList.length){
					//parsed all of resultList, time to view graph
					//viewGraph(raw_graph_data);
					visViewGraph(raw_graph_data);
				} */
				count++;
/* 				if(count == length-1){
					$('#loading').hide();
					$('#downloadBtn').show();
					createDownloadFile(downloadContent);
					$('#resultTable').DataTable();
				} */
			}
		}).done(function(){
			if(count == length-1){
				createDownloadFile(downloadContent);
				//$('#resultTable').DataTable();
				
				$('#loading').hide();
				$('#downloadBtn').show();
				$('#results').show();
				$('#btn_vis').show();
		}
		
		});
		
	}
}


function showError(content){
	
	$('#error_content').html(content)
	$('#error').show();
	$('#loading').hide();
	
}

function appendOntologyToTable(obj){
	
	table.row.add( [
			obj.ontologyId,
			obj.ontologyName,
			obj.description,
			obj.numberOfInput,
			obj.numberOfReference,
			obj.p.toExponential(4),
			obj.ontologyCategory
		] ).draw( false );
		
/* 	let tr1 = document.createElement('tr');
	
	let atts = [
		obj.ontologyId,
		obj.ontologyName,
		obj.description,
		obj.numberOfInput,
		obj.numberOfReference,
		obj.p.toExponential(4),
		obj.ontologyCategory
	];

	for (let att of atts) {
		let td = document.createElement('td');
		let node = document.createTextNode(att);
		td.appendChild(node);
		tr1.appendChild(td);
	}
	document.querySelector('#result_table').appendChild(tr1); */
}

function initializeDownloadContent(){
	downloadContent ="This is the ontology enrichment analysis result created by Planteome"+"\n";
	var date = new Date();
	var str = date.toDateString();
	downloadContent+=str + "\n";
}

function appendInputDesicription(inputGenesNum, BackgroundGenes){
	downloadContent += 'the number of input genes is: ' + inputGenesNum + '\n'+
					   'the number of background genes is: ' + BackgroundGenes + '\n';
	
	downloadContent +="Each column menas:" +'\n'
	+ "1 Ontology Database ID" +"\n"
	+ "2 Ontology Name" +"\n"
	+ "3 number of genes annotated to the ontology in input" +"\n"
	+ "4 number of genes annotated to the ontology in background" +"\n"
	+ "5 p-value" +"\n"
	+ "6 Ontology Category" +"\n"
	+ "7 Ontology description" +"\n\n";
	
}

function appendOntologyToDownload(obj){
	let atts = [
		obj.ontologyId,
		obj.ontologyName,
		obj.numberOfInput,
		obj.numberOfReference,
		obj.p.toExponential(5),
		obj.ontologyCategory,
		obj.description,
	];
	
	for (let att of atts) {
		downloadContent += att +"\t";
	}
	downloadContent += "\n";
}

function createDownloadFile(data){
	var textFile = null;
	var makeTextFile = function (text) {
	var data = new Blob([text], {type: 'text/plain'});

	// If we are replacing a previously generated file we need to
	// manually revoke the object URL to avoid memory leaks.
	if (textFile !== null) {
	  window.URL.revokeObjectURL(textFile);
	}

	textFile = window.URL.createObjectURL(data);

	return textFile;
	};

	var link = document.getElementById('downloadBtn');
	link.href = makeTextFile(data);
}

function visualize(){
	
	sessionStorage.setItem('graphData', JSON.stringify(raw_graph_data));
	sessionStorage.setItem('resultList', JSON.stringify(resultList));
	
	window.open("./visualization.html");
	console.log('vis opened');

}

