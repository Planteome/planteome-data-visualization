'use strict';

let url_browse = settings.url_AmigoLink;
let url_ApiLink = settings.url_ApiLink;

let show_results = true;

var raw_graph_data = [];
var resultList = [];
let downloadContent = "";
let downloadContentHeader = "";
var table;
var inputGenes = [];	
var ambiguousData;

//var atable;
let ontologyCategory ='';	//selected ontology category
let analysisType;			//selected query type: input reference or online database
var test_sel;				//selected statistic method
var cutoff;					//cut off p-value
var speciesID = '3702';		//taxon ID


//object Ontology
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
	this.associatedGenes = [];
}

//object Annotation
function annotation(m_geneID, m_ontolgoyID) {
	if(m_geneID === undefined)
		m_geneID=0;
	if(m_ontolgoyID === undefined)
		m_ontolgoyID=0;

    this.geneID = m_geneID;
    this.ontologyID = m_ontolgoyID;
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
	   ['Aegilops_tauschii', '37682',                 ],
	   ['Amborella_trichopoda', '13333',              ],
	   ['Arabidopsis_lyrata' , '59689',               ],
	   ['Arabidopsis_thaliana', '3702',               ],
	   ['Arachis_duranensis', '130453',               ],
	   ['Arachis_ipaensis', '130454',                 ],
	   ['Batrachochytrium_dendrobatidis', '109871',   ],
	   ['Brachypodium_distachyon', '15368',           ],
	   ['Brachypodium_sylvaticum.Corv', '29664',      ],
	   ['Brachypodium_sylvaticum.Greece', '29664',    ],
	   ['Brachypodium_sylvaticum.Spain', '29664',     ],
	   ['Brassica_oleracea', '3712',                  ],
	   ['Brassica_rapa' ,'3711',                      ],
	   ['Caenorhabditis_elegans', '6239',             ],
	   ['Cajanus_cajan', '3821',                      ],
	   ['Cannabis_sativa.Purple.Kush', '3483',        ],
	   ['Capsella_rubella', '81985',                  ],
	   ['Capsicum_annuum', '4072',                    ],
	   ['Carica_papaya', '3649',                      ],
	   ['Chlamydomonas_reinhardtii', '3055',          ],
	   ['Cicer_arietinum', '3827',                    ],
	   ['Citrullus_lanatus', '3654',                  ],
	   ['Citrus_clementina', '85681',                 ],
	   ['Citrus_sinensis', '2711',                    ],
	   ['Coffea_canephora', '49390',                  ],
	   ['Cucumis_sativus', '3659',                    ],
	   ['Danio_rerio', '7955',                        ],
	   ['Drosophila_melanogaster', '7227',            ],
	   ['Ectocarpus_siliculosus', '2880',             ],
	   ['Elaphocordyceps_capitata', '45325',          ],
	   ['Elaphocordyceps_ophioglossoides', '71617',   ],
	   ['Elaphocordyceps_paradoxa', '94208',          ],
	   ['Epichloe_festucae', '35717',                 ],
	   ['Escherichia_coli', '562',                    ],
	   ['Eucalyptus_grandis', '71139',                ],
	   ['Fragaria_vesca', '57918',                    ],
	   ['Fusarium_graminearum', '5518',               ],
	   ['Fusarium_oxysporum.4287', '660037',          ],
	   ['Fusarium_verticillioides', '117187',         ],
	   ['Gadus_morhua', '8049',                       ],
	   ['Gasterosteus_aculeatus', '69293',            ],
	   ['Glycine_max', '3847',                        ],
	   ['Gossypium_raimondii', '29730',               ],
	   ['Homo_sapiens', '9606',                       ],
	   ['Hordeum_vulgare', '4513',                    ],
	   ['Jatropha_curcas', '180498',                  ],
	   ['Kalanchoe_laxiflora', '1670617',             ],
	   ['Laccaria_bicolor', '29883',                  ],
	   ['Leersia_perrieri', '77586',                  ],
	   ['Linum_usitatissimum', '4006',                ],
	   ['Magnaporthe_grissa', '148305',               ],
	   ['Malus_domestica', '3750',                    ],
	   ['Manihot_esculenta', '3983',                  ],
	   ['Medicago_truncatula', '3880',                ],
	   ['Mimulus_guttatus', '4155',                   ],
	   ['Mus_musculus', '10090',                      ],
	   ['Musa_acuminata', '4641',                     ],
	   ['Nectria_haematococca', '140110',             ],
	   ['Nelumbo_nucifera', '4432',                   ],
	   ['Neurospora_crassa', '5141',                  ],
	   ['Nostoc_punctiforme', '272131',               ],
	   ['Oncorhynchus_mykiss', '8022',                ],
	   ['Oryza_australiensis', '4532',                ],
	   ['Oryza_barthii', '65489',                     ],
	   ['Oryza_brachyantha', '4533',                  ],
	   ['Oryza_glaberrima', '4538',                   ],
	   ['Oryza_glumaepatula', '40148',                ],
	   ['Oryza_granulata', '110450',                  ],
	   ['Oryza_kasalath', '4527',                     ],
	   ['Oryza_longistaminata', '4528',               ],
	   ['Oryza_meridionalis', '40149',                ],
	   ['Oryza_minuta', '63629',                      ],
	   ['Oryza_nivara', '4536',                       ],
	   ['Oryza_officinalis', '4535',                  ],
	   ['Oryza_punctata', '4537',                     ],
	   ['Oryza_rufipogon', '4529',                    ],
	   ['Oryza_sativa.indica.gramene', '39946',       ],
	   ['Oryza_sativa.indica.iplant', '39946',        ],
	   ['Oryza_sativa.indica.IR29', '39946',          ],
	   ['Oryza_sativa.indica.pokkali', '39946',       ],
	   ['Oryza_sativa.japonica.iplant', '39947',      ],
	   ['Oryza_sativa.japonica.IRGSP', '39947',       ],
	   ['Oryza_sativa.japonica.MSU', '39947',         ],
	   ['Oryzias_latipes', '8090',                    ],
	   ['Pediculus_humanus', '121225',                ],
	   ['Phaseolus_vulgaris', '3885',                 ],
	   ['Phoenix_dactylifera', '42345',               ],
	   ['Phyllostachys_heterocycla', '38705',         ],
	   ['Physcomitrella_patens', '3218',              ],
	   ['Phytophthora_infestans', '4787',             ],
	   ['Picea_abies', '3329',                        ],
	   ['Pinus_taeda', '3352',                        ],
	   ['Populus_trichocarpa', '3694',                ],
	   ['Populus_trichocarpa.ver3', '3694',           ],
	   ['Prunus_persica', '3760',                     ],
	   ['Rattus_norvegicus', '10116',                 ],
	   ['Rhizopus_oryzae', '64495',                   ],
	   ['Ricinus_communis', '3988',                   ],
	   ['Saccharomyces_cerevisiae', '4932',           ],
	   ['Salvia_hispancia.salba', '49212',            ],
	   ['Salvia_splendens', '180675',                 ],
	   ['Schizosaccharomyces_pombe', '4896',          ],
	   ['Selaginella_moellendorffii', '88036',        ],
	   ['Setaria_italica', '4555',                    ],
	   ['Solanum_lycopersicum', '4081',               ],
	   ['Solanum_tuberosum', '4113',                  ],
	   ['Sorghum_bicolor', '4558',                    ],
	   ['Synechocystis_pcc6803', '1148',              ],
	   ['Takifugu_rubripes', '31033',                 ],
	   ['Tetraodon_nigroviridis', '99883',            ],
	   ['Theobroma_cacao', '3641',                    ],
	   ['Tolypocladium_inflatum', '29910',            ],
	   ['Trichodesmium_erythraeum', '1206',           ],
	   ['Triticum_aestivum', '4565',                  ],
	   ['Triticum_monococcum.DV92', '4568',           ],
	   ['Triticum_monococcum.G3116', '4568',          ],
	   ['Triticum_turgidum', '4571',                  ],
	   ['Triticum_urartu', '4572',                    ],
	   ['Vitis_vinifera', '29760',                    ],
	   ['Zea_mays', '4577',                           ]
	];
		
	document.getElementById("gnames").innerHTML = 
	"Please input names of the interesting gene products. e.g.:<br/>"+
   "GR1        <br/>"+
   "ENO1       <br/>"+
   "ENOC       <br/>"+
   "LOS2       <br/>"+
   "SAC52      <br/>"+
   "AT1G18540  <br/>"+
   "RPL10B     <br/>"+
   "PRPL11     <br/>"+
   "RP1        <br/>"+
   "RPL3B      <br/>"+
   "SAG24      <br/>"+
   "AT1G74050  <br/>"+
   "AT1G74060  <br/>"+
   "RPL24A     <br/>"+
   "AT2G37190  <br/>"+
   "RPL23AA    <br/>"+
   "RPL16A     <br/>"+
   "AT2G44860  <br/>"+
   "ATL5       <br/>"+
   "STV1       <br/>"+
   "AT3G53430  <br/>"+
   "RPL23AB    <br/>"+
   "AT4G01310  <br/>"+
   "MRPL11     <br/>"+
   "RPL5B      <br/>"+
   "AT5G51610  <br/>"+
   "AT5G60670  <br/>"+
   "RPL20      <br/>"+
   "NFD3       <br/>"+
   "P40        <br/>"+
   "P40        <br/>"+
   "AT2G04390  <br/>"+
   "AT2G05220  <br/>"+
   "AT2G07696  <br/>"+
   "AT2G36160  <br/>"+
   "RPS5B      <br/>"+
   "AT2G45710  <br/>"+
   "AT3G02080  <br/>"+
   "RPSAb      <br/>"+
   "RPSAb      <br/>"+
   "AT3G10610  <br/>"+
   "AT3G11510  <br/>"+
   "RPS5A      <br/>"+
   "AT3G52580  <br/>"+
   "RS27A      <br/>"+
   "AT3G61111  <br/>"+
   "AT4G25740  <br/>"+
   "AT5G04800  <br/>"+
   "AT5G15520  <br/>"+
   "RPS10B     <br/>"+
   "AT5G47930  <br/>"+
   "AT5G52650  <br/>"+
   "AT5G61170  <br/>"+
   "RPS19      <br/>"+
   "APTG1      <br/>"+
   "PNT1       <br/>"+
   "FATB       <br/>"+
   "mtACP2     <br/>"+
   "MTACP-1    <br/>"+
   "FaTA       <br/>"+
   "AT4G13050  <br/>"+
   "ACP5       <br/>"+
   "mtACP3     <br/>"+
   "VPS34      <br/>"+
   "ATG8C      <br/>"+
   "ATG8D      <br/>"+
   "ATG10      <br/>"+
   "ATG2       <br/>"+
   "APG8A      <br/>"+
   "AT5G49540  <br/>"+
   "AT1G07070  <br/>"+
   "AT1G41880  <br/>"+
   "ALATS      <br/>"+
   "ALATS      <br/>"+
   "PSD        <br/>"+
   "PSD        <br/>"+
   "AT1G74270  <br/>"+
   "AT1G76170  <br/>"+
   "AT2G40660  <br/>"+
   "CTEXP      <br/>"+
   "ROL5       <br/>"+
   "AT3G55750  <br/>"+
   "AT3G59980  <br/>"+
   "AT3G59980  <br/>"+
   "AT4G13780  <br/>"+
   "EMB1030    <br/>"+
   "AT5G24840  <br/>"+
   "ERS        <br/>"+
   "ARGAH2     <br/>"+
   "ARGAH1     <br/>"+
   "AT1G13160  <br/>"+
   "AT2G37990  <br/>"+
   "AT4G31520  <br/>"+
   "MOS7       <br/>"+
   "MOS7       <br/>"+
   "AT1G26170  <br/>"+
   "TRN1       <br/>"+
   "SAD2       <br/>"+
   "AT2G46520  <br/>"+
   "XPO1B      <br/>";


	document.getElementById("gids").innerHTML = 
	"Please input accession IDs of the interesting gene products. e.g.:<br/>"+
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

	
	document.getElementById("help_reference").innerHTML = 
	"Please input the annotations as following:<br/>"+
"test_0001   GO:0000001</br>"+
"test_0002   GO:0000001</br>"+
"test_0003   GO:0000001</br>"+
"test_0004   GO:0000001</br>"+
"test_0005   GO:0000001</br>"+
"test_0006   GO:0000001</br>"+
"test_0007   GO:0000001</br>"+
"test_0008   GO:0000001</br>"+
"test_0009   GO:0000001</br>"+
"test_0010   GO:0000002</br>"+
"test_0011   GO:0000002</br>"+
"test_0012   GO:0000002</br>"+
"test_0013   GO:0000002</br>"+
"test_0014   GO:0000002</br>"+
"test_0015   GO:0000002</br>"+
"test_0016   GO:0000002</br>"+
"test_0017   GO:0000003</br>"+
"test_0018   GO:0000003</br>"+
"test_0019   GO:0000005</br>"+
"test_0020   GO:0000006</br>"+
"test_0021   GO:0000007</br>"+
"test_0022   GO:0000008</br>"+
"test_0023   GO:0000009</br>"+
"test_0024   GO:0000010</br>"+
"test_0025   GO:0000001</br>"+
"test_0026   GO:0000001</br>"+
"test_0027   GO:0000001</br>"+
"test_0028   GO:0000001</br>"+
"test_0029   GO:0000002</br>"+
"test_0030   GO:0000002</br>"+
"test_0031   GO:0000002</br>"+
"test_0032   GO:0000018</br>"+
"test_0033   GO:0000019</br>"+
"test_0034   GO:0000020</br>"+
"test_0035   GO:0000021</br>"+
"test_0036   GO:0000022</br>"+
"test_0037   GO:0000023</br>"+
"test_0038   GO:0000024</br>"+
"test_0039   GO:0000025</br>"+
"test_0040   GO:0000026</br>"+
"test_0041   GO:0000027</br>"+
"test_0042   GO:0000028</br>"+
"test_0043   GO:0000029</br>"+
"test_0044   GO:0000030</br>"+
"test_0045   GO:0000031</br>"+
"test_0046   GO:0000032</br>"+
"test_0047   GO:0000033</br>"+
"test_0048   GO:0000034</br>"+
"test_0049   GO:0000035</br>"+
"test_0050   GO:0000036</br>"+
"test_0051   GO:0000037</br>"+
"test_0052   GO:0000038</br>"+
"test_0053   GO:0000039</br>"+
"test_0054   GO:0000040</br>"+
"test_0055   GO:0000041</br>"+
"test_0056   GO:0000042</br>"+
"test_0057   GO:0000043</br>"+
"test_0058   GO:0000044</br>"+
"test_0059   GO:0000045</br>"+
"test_0060   GO:0000046</br>"+
"test_0061   GO:0000047</br>"+
"test_0062   GO:0000048</br>"+
"test_0063   GO:0000049</br>"+
"test_0064   GO:0000050</br>"+
"test_0065   GO:0000051</br>"+
"test_0066   GO:0000052</br>"+
"test_0067   GO:0000053</br>"+
"test_0068   GO:0000054</br>"+
"test_0069   GO:0000055</br>"+
"test_0070   GO:0000056</br>"+
"test_0071   GO:0000057</br>"+
"test_0072   GO:0000058</br>"+
"test_0073   GO:0000059</br>"+
"test_0074   GO:0000060</br>"+
"test_0075   GO:0000061</br>"+
"test_0076   GO:0000062</br>"+
"test_0077   GO:0000063</br>"+
"test_0078   GO:0000064</br>"+
"test_0079   GO:0000065</br>"+
"test_0080   GO:0000066</br>"+
"test_0081   GO:0000067</br>"+
"test_0082   GO:0000068</br>"+
"test_0083   GO:0000069</br>"+
"test_0084   GO:0000070</br>"+
"test_0085   GO:0000071</br>"+
"test_0086   GO:0000072</br>"+
"test_0087   GO:0000073</br>"+
"test_0088   GO:0000074</br>"+
"test_0089   GO:0000075</br>"+
"test_0090   GO:0000076</br>"+
"test_0091   GO:0000077</br>"+
"test_0092   GO:0000078</br>"+
"test_0093   GO:0000079</br>"+
"test_0094   GO:0000080</br>"+
"test_0095   GO:0000081</br>"+
"test_0096   GO:0000082</br>"+
"test_0097   GO:0000083</br>"+
"test_0098   GO:0000084</br>"+
"test_0099   GO:0000085</br>"+
"test_0100   GO:0000086</br>";
	
	let e_species = document.querySelector('#species');
	for(let t of taxonList){
		e_species.appendChild(taxonFactory(t[0],t[1]));
	}
	
	//set the default selection
	$('#species').val(speciesID);

	
	let x = document.getElementById("ontologyCategory").value;
	ontologyCategory = x;
	
	
	$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
		console.log(event);
		console.log(jqxhr);
		console.log(settings);
		console.log(thrownError);
		showError("Sorry, there is something wrong with the server and we are trying to solve it...");
	});
	
	$(document).ready(function(){
		table = $('#resultTable').DataTable();
	});
	
}

function onclick_submit(){
	
	my_submitReset();
	initializeDownloadContent();
	show_results = true;
	
	//get the setting of p-value calculation
	test_sel = document.querySelector('#method').value;
	cutoff = document.querySelector('#significance').value;
	cutoff = parseFloat(cutoff);
	
	if(analysisType == 'userinput')
		staticAnalysis();
	else{
		createDisambigousGeneList();
		dynamicAnalysis();
	}
}

function createDisambigousGeneList(){
	
	for(let i of ambiguousData.good)
		inputGenes.push(i.results[0].id);
	
	for(let i of ambiguousData.ugly){
		
		let select = $('input[name='+i.input+']:checked').val();
		let selectedGene = i.results[select].id;
		inputGenes.push(selectedGene);
	}
	
}

function splitStringToGeneList(str){
	let geneIDList = [];
	let rex = /[\n\r\t]+/
	let inputData = str.split(rex);	// Split on carriage return
	
	let x;
	for(x in inputData){
		let trimmedData = inputData[x].trim();
		if(trimmedData ==='')
			continue;

		geneIDList.push(trimmedData);
	}
	return geneIDList;
}

function splitStringToAnnotation(str){
	
	var annotationList = [];
	let rex = /[\n\r]+/
	let inputData = str.split(rex);	// Split on carriage return
	
	var x;
	for(x in inputData){
		var trimmedData = inputData[x].trim();

		if(trimmedData ==='')
			continue;
		var txt = inputData[x].split(/[\s\t]+/g);
		var annotationData = new annotation(txt[0], txt[1]);
		annotationList.push(annotationData);
	}
	return annotationList;
}

function my_submitReset(){
	$('#loading').hide();
	$('#results').hide();
	$('#downloadBtn').hide();
	$('#error').hide();
	
	
	table.clear().draw();
	
	document.querySelector('#result_summary').innerHTML = '';

	//reset globals
	raw_graph_data = [];
	resultList = [];
	inputGenes = [];
}

function onclick_disambiguity(){
	
	let str_geneList = document.querySelector('#textarea_geneList').value;
	if( str_geneList == ''){
		showError('please input the interesting gene list');
		return false;
	}

	let inputGenes = splitStringToGeneList(str_geneList);
	
	//clear the ambiguous table
	var tableBody = $('#disambiguityTableBody');
	tableBody.html("");
	
	disAmbiguateGenes(inputGenes);
	
	
}

function my_reset(){
	show_results = false;
	document.querySelector('#textarea_geneList').value = '';
	document.querySelector('#textarea_backgroundList').value = '';
	my_submitReset();
	
	//$('#disam').show();
	$('#submit').hide();
	$('#btn_vis').hide();
	
	//clear the ambiguous table
	var tableBody = $('#disambiguityTableBody');
	tableBody.html("");	
	
	$('#disambiguity').hide();
	$('#toggleAmbiguousTable').hide();
	
	$('#badGenesPanel').hide();
	
	$('#error').hide();	
	
}

//when the input gene list is changed
function onchange_InterestingInput(){

	//$('#disam').show();
	$('#submit').hide();
	
	//clear the ambiguous table
	var tableBody = $('#disambiguityTableBody');
	tableBody.html("");	
	
	$('#disambiguity').hide();
	$('#toggleAmbiguousTable').hide();
	
	$('#badGenesPanel').hide();
	
	$('#error').hide();
}

function onclick_QueryTypeChange(){
	analysisType = document.getElementById("queryType").value;
	if(analysisType == 'userinput'){
		$('#referenceBackground').show();
		$('#submit').show();
		$('#disam').hide();
	}
	else{
		$('#submit').hide();
		$('#disam').show();
		$('#referenceBackground').hide();
	}
}

function onclick_speciesChange(){
	
	let x = document.getElementById("species").value;
	speciesID = x;
	
	onchange_InterestingInput();
}

function onclick_ontologyCategoryChange(){
	
	//upper selection
	let x = document.getElementById("ontologyCategory").value;
	ontologyCategory = x;
	
	initializeDownloadContent();
	
	downloadContent += downloadContentHeader;
	
	table.clear().draw();
	
	for(let i of resultList){
			
		if(ontologyCategory=='all' || i.ontologyCategory ==ontologyCategory){
			appendOntologyToTable(i);
			appendOntologyToDownload(i);
		}
	};
	
	//refresh the download file
	createDownloadFile(downloadContent);
	
	//lower selection
	$('#ontologyCategory2').val(x);

}

function onclick_ontologyCategoryChange2(){
	
	//upper selection
	let x = document.getElementById("ontologyCategory2").value;
	ontologyCategory = x;
	
	initializeDownloadContent();
	
	downloadContent += downloadContentHeader;
	
	table.clear().draw();
	
	for(let i of resultList){
			
		if(ontologyCategory=='all' || i.ontologyCategory ==ontologyCategory){
			appendOntologyToTable(i);
			appendOntologyToDownload(i);
		}
	};
	
	//refresh the download file
	createDownloadFile(downloadContent);
	
	//upper selection
	$('#ontologyCategory').val(x);
}

//get the overview information from server
function getOverView(){
	return $.ajax({
		type: 'get',
		//url: url_stats + 'overview',
		url:url_ApiLink +'statistics/overview',
		dataType: 'json'
	});
}

function disAmbiguateGenes(geneList){
	
	let link = url_ApiLink +'disambiguation/bioentity?'
	let data = '';
	
	data += 'species=NCBITaxon:' + speciesID;
	
	for(let i of geneList){
		data +='&entity='+i;
	}
	
	$.ajax({
		type: 'post',
		url:link,
		data:data,
		dataType: 'json',
		success: function(res){
			//console.log(res.data);
			
			ambiguousData = res.data;
			let ambiguousUglyData = res.data.ugly;
			let ambiguousBadData = res.data.bad;
			
			if(ambiguousUglyData.length == 0 && ambiguousBadData.length == 0){
				showSucessText("There is NO ambiguous inputs, you could SUBMIT your analysis!");
				//$('#disam').hide();
				$('#submit').show();
			}
			
			if(ambiguousBadData.length != 0){
				showError("There are genes not in the selected taxon...");
				$('#badGenesPanel').show();
				$('#badGenes').html("")
				let bglist = ambiguousBadData;
				for(let i of bglist) {
					$('#badGenes').append("<span class=\"label label-warning\">" + i.input + "</span> ");
				}
			}else{
				$('#badGenesPanel').hide();
			}
			
			if(ambiguousUglyData.length != 0){
				
				//show information
				showError("Please select from ambiguous terms to target the gene product...");
				
				//reset the buttons
				$('#disambiguity').show();
				$('#toggleAmbiguousTable').show();
				//$('#disam').hide();
				$('#submit').show();
				
				//clear the ambiguous table
				// var tableBody = $('#disambiguityTableBody');
				// tableBody.html("");
				
			}else{
				
				$('#error').hide();
				$('#disambiguity').hide();
				$('#toggleAmbiguousTable').hide();
			}
			
 			for(let i of ambiguousUglyData){
				
				let input = i.input;
				let ambiguousObjs = i.results;
				let ambNum = ambiguousObjs.length;
				
				appendAmbiguityRowToTable(input, ambNum, ambiguousObjs);
				
			}
		}
	});
}

function onclick_toggleDisambiguousTalbe(){
	
	var query = $('#disambiguityTableBody');
	var isVisible = query.is(':visible');
	
	if (isVisible === true) {
		$('#disambiguityTableBody').hide();
	}
	else{
		$('#disambiguityTableBody').show();
	}
		
}


function appendAmbiguityRowToTable(input, amNum, amObjs){
	
	var tableBody = $('#disambiguityTableBody');
	
 	let anode = $('<a>').text(amObjs[0].id).attr({
		href: url_browse+"gene_product/" + amObjs[0].id,
		target: "_blank"
	})
			
	tableBody.append($('<tr>')
		.append($('<td>')
			.attr('rowspan', amNum)
			.text(input)
		)
		.append($('<td>')
			.append($('<input>')
				.attr({
					type: 'radio',
					name: input,
					value: 0,
					checked: "checked"
				})
			)
			.append($('<span>').append(anode))
		)
		.append($('<td>').text(amObjs[0].matched)
		)
		
	);
	
	for(let i = 1; i<amNum; i++){
		
		let anode = $('<a>').text(amObjs[i].id).attr({
				href:url_browse + "gene_product/" + amObjs[i].id,
				target: "_blank"
			})
		
		tableBody.append($('<tr>')
			.append($('<td>')			
				.append($('<input>')
						.attr({
							type: 'radio',
							name: input,
							value: i
						})
					)
				.append($('<span>').append(anode))
			)
			.append($('<td>').text(amObjs[i].matched)
			)
		);
	}	
	
}

function getOntologyTermsFromGenes(geneList){
	//let link = url_stats + 'gene-to-term?';
	let link = url_ApiLink + 'statistics/gene-to-term?';
	
	let data = '';

	for(let i of geneList){
		data +='bioentity='+i+'&';
	}
	data += 'taxon=' + speciesID;

	//console.log(link);

	return $.ajax({
		type: 'post',
		url: link,
		data: data,
		dataType: 'json'
	});
}

function getGenesNumInRefFromOntologys(ontologyList){
	//let link = url_stats + 'term-to-gene?';
	let link = url_ApiLink + 'statistics/term-to-gene?';
	
	let data = '';

	for(let i in ontologyList){
		data +='term='+i+'&';
	}
	data += 'taxon=' + speciesID;

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
			url: url_browse + 'term/' + j.ontologyId + '/json',
			dataType: 'json',
			success: function(res){

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
				raw_graph_data.push(res.results);
				
				
				// "topology_graph_json" :
				//ontology: JSON blob form of the local relation transitivity graph. Uses various relations (including regulates, occurs in, capable_of).
				
				//"regulates_transitivity_graph_json"
				//ontology: JSON blob form of all immediate neighbors of the term.
				
				//"neighborhood_graph_json" 
				//ontology: JSON blob form of all immediate neighbors of the term; in the case that there are too many neighbors to transport, the number will be artificially reduced.
				
				//"neighborhood_limited_graph_json" 
				//ontology: Only in taxon.
    
				count++;

			}
		}).done(function(){
			if(count == length-1){
				createDownloadFile(downloadContent);
				
				$('#loading').hide();
				$('#downloadBtn').show();
				$('#results').show();
				$('#btn_vis').show();
		}
		
		});
		
	}
}

//analysis based on user's input reference
function staticAnalysis(){
	
	$('#loading').show();
	var ontolotyIDList = [];
	var inputGenesIDList = [];
	var referGenesIDList = [];
	var ontologyDataList = [];
	
	var str_geneList= $("#textarea_geneList").val();
	var str_referList = $("#textarea_backgroundList").val();
	if( str_geneList == ""){
		showError("please input the interesting gene list");
		return false;
	}
	if( str_referList == ""){
		showError("please input the interesting gene list");
		return false;
	}
	var inputAnnotationData = splitStringToAnnotation(str_geneList);
	var referAnnotationData = splitStringToAnnotation(str_referList);

	function getOntologyNumFromAnnoData(str,AnnotationData ){
		var num = 0;
		for(var x in AnnotationData){
			if(AnnotationData[x].ontologyID === str)
				num++;
		}
		return num;
	}

	for(var i in inputAnnotationData){
		var txt = inputAnnotationData[i].ontologyID;
		if($.inArray(txt, ontolotyIDList) === -1)
			ontolotyIDList.push(txt);
		
		txt = inputAnnotationData[i].geneID;
		if($.inArray(txt, inputGenesIDList) === -1)
			inputGenesIDList.push(txt);
	}
	
	for(var i in referAnnotationData){
		txt = referAnnotationData[i].geneID;
		if($.inArray(txt, referGenesIDList) === -1)
			referGenesIDList.push(txt);
	}
	
	
	var n = inputGenesIDList.length;
	var N = referGenesIDList.length;
	
	$("#result_summary").html("the number of input genes is: "+n+" <br> the number of reference genes is: "+N+"<br>");
	
	for(var i in ontolotyIDList){
		var str = ontolotyIDList[i]
		var numOfInput = getOntologyNumFromAnnoData(str,inputAnnotationData);
		var numOfRefer = getOntologyNumFromAnnoData(str,referAnnotationData);
		
		//calculate the p with using inputData.length, referenceData.length, numOfInput, numOfRefer	
		let p = caculatePvalue(numOfInput,numOfRefer,n,N)
		
		if(p > cutoff && !Number.isNaN(p))
			continue;

		var m_ontologyACC;
		var m_description;
		
		var m_ontologyData = new ontology(m_ontologyACC,str, m_description, numOfInput, numOfRefer,p);
		ontologyDataList.push(m_ontologyData);
	}

	
	for(var i in ontologyDataList)
		appendOntologyToTable(ontologyDataList[i]);
	
	$('#loading').hide();
	$('#results').show();
}





//analysis based on reference database
function dynamicAnalysis(){
	
	let inputGenesNum = inputGenes.length;

	showText("Processing...");

	$.when(getOverView(), getOntologyTermsFromGenes(inputGenes)).done(function(overview_data, ol_data){
		
		if(!show_results){
			console.log('cancelling terms request due to reset button');
			return false;
		}
		
		let summary = overview_data[0].data;
		let referenceGenesNum = summary['gene-product-count'];
		document.querySelector('#result_summary').innerHTML = 'the number of input genes is: ' +inputGenesNum + ' <br> the number of background genes is: ' + referenceGenesNum + '<br>';

		//output the input information to download fileCreatedDate
		appendInputDesicription(inputGenesNum,referenceGenesNum);

		let ontologyList = ol_data[0].data['gene-to-term-summary-count'];
		
		//console.log(ol_data);

		$.when(getGenesNumInRefFromOntologys(ontologyList)).done(function(data, textStatus, jqXHR){
			if(!show_results){
				console.log('cancelling ref request due to reset button');
				return false;
			}
			
			
			let ontologyListRef = data.data['term-to-gene-summary-count'];

			for(let ontology_ID in ontologyList){
				// K
				let numOfRefer = ontologyListRef[ontology_ID];
				// k
				let numOfInput = ontologyList[ontology_ID];
				// N
				let N = referenceGenesNum;
				// n
				let n = inputGenesNum;

				if(numOfRefer == 0)
					continue;
				if(numOfInput == 0)
					continue;
				
				let p = caculatePvalue(numOfInput,numOfRefer,n,N);

				if(Number.isNaN(p)){
					console.log(p);
					continue;
				}
				
				if(p == null){
					console.log(p);
					continue;
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

			showText('analysis of data finished, retrieving ontology data from server...');
			
			getOntologyData(resultList);
			
			
			if(resultList.length == 0){
				showError("Sorry, there is something wrong with the server... We are fixing it and please come back in the future...")
			}
		});
	});
}


function caculatePvalue(numOfInput,numOfRefer,n,N){
	
	// if(test_sel != 'chi-squared' && test_sel != 'hypergeometric'){
		// if(numOfInput > 500 || numOfRefer > 500 || n > 500 || N > 500){
			// console.log('should use chi or hypergeo for large numbers');
		// }
	// }

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
	
	return p;
}

function showError(content){
	
	$('#error').show();
	$('#error_content').html(content)
	
	$('#loading').hide();
	$('#success').hide();
	
}

function showText(content){
	
	$('#loading').show();
	$('#processingTxt').html(content)
	
	$('#error').hide();
	$('#success').hide();
}

function showSucessText(content){
	
	$('#success').show();
	$('#success_content').html(content)
	
	$('#loading').hide();
	$('#error').hide();
}

function appendOntologyToTable(obj){
	

	//let link = "http://browser.planteome.org/amigo/term/" + obj.ontologyId;
	let link = url_browse + "term/" + obj.ontologyId;
	
	let idNode = "<a target='_blank' href="+link + ">" + obj.ontologyId + "</a>";
	
	table.row.add( [
			idNode,
			obj.ontologyName,
			obj.description,
			obj.numberOfInput,
			obj.numberOfReference,
			obj.p.toExponential(4),
			obj.ontologyCategory
		] ).draw( false );
		
}

function initializeDownloadContent(){
	downloadContent ="This is the ontology enrichment analysis result created by Planteome"+"\n";
	var date = new Date();
	var str = date.toDateString();
	downloadContent+=str + "\n";
}

function appendInputDesicription(inputGenesNum, BackgroundGenes){
	downloadContentHeader = 'the number of input genes is: ' + inputGenesNum + '\n'+
					   'the number of background genes is: ' + BackgroundGenes + '\n';
	
	downloadContentHeader +="Each column menas:" +'\n'
	+ "1 Ontology Database ID" +"\n"
	+ "2 Ontology Name" +"\n"
	+ "3 number of genes annotated to the ontology in input" +"\n"
	+ "4 number of genes annotated to the ontology in background" +"\n"
	+ "5 p-value" +"\n"
	+ "6 Ontology Category" +"\n"
	+ "7 Ontology description" +"\n\n";
	
	downloadContent += downloadContentHeader;
	
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

