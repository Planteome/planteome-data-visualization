var settings = {
	url_AmigoLink: 'http://browser.planteome.org/amigo/',
	url_ApiLink: 'http://browser.planteome.org/api/',
	//url_AmigoLink: 'http://test.planteome.org/amigo/',		//test server
	//url_ApiLink: 'http://test.planteome.org/api/',			//test server
}

var data2 = {
  "nodes1":  [
	{ "name": "Myriel",             "group":  1 },
	{ "name": "Napoleon",           "group":  1 },
	{ "name": "Mlle.Baptistine",    "group":  1 },
	{ "name": "Mme.Magloire",       "group":  1 },
	{ "name": "CountessdeLo",       "group":  1 },
	{ "name": "Geborand",           "group":  1 },
	{ "name": "Champtercier",       "group":  1 },
	{ "name": "Cravatte",           "group":  1 },
	{ "name": "Count",              "group":  1 },
	{ "name": "OldMan",             "group":  1 },
	{ "name": "Labarre",            "group":  2 },
	{ "name": "Valjean",            "group":  2 },
	{ "name": "Marguerite",         "group":  3 },
	{ "name": "Mme.deR",            "group":  2 },
	{ "name": "Isabeau",            "group":  2 },
	{ "name": "Gervais",            "group":  2 },
	{ "name": "Tholomyes",          "group":  3 },
	{ "name": "Listolier",          "group":  3 },
	{ "name": "Fameuil",            "group":  3 },
	{ "name": "Blacheville",        "group":  3 },
	{ "name": "Favourite",          "group":  3 },
	{ "name": "Dahlia",             "group":  3 },
	{ "name": "Zephine",            "group":  3 },
	{ "name": "Fantine",            "group":  3 },
	{ "name": "Mme.Thenardier",     "group":  4 },
	{ "name": "Thenardier",         "group":  4 },
	{ "name": "Cosette",            "group":  5 },
	{ "name": "Javert",             "group":  4 },
	{ "name": "Fauchelevent",       "group":  0 },
	{ "name": "Bamatabois",         "group":  2 },
	{ "name": "Perpetue",           "group":  3 },
	{ "name": "Simplice",           "group":  2 },
	{ "name": "Scaufflaire",        "group":  2 },
	{ "name": "Woman1",             "group":  2 },
	{ "name": "Judge",              "group":  2 },
	{ "name": "Champmathieu",       "group":  2 },
	{ "name": "Brevet",             "group":  2 },
	{ "name": "Chenildieu",         "group":  2 },
	{ "name": "Cochepaille",        "group":  2 },
	{ "name": "Pontmercy",          "group":  4 },
	{ "name": "Boulatruelle",       "group":  6 },
	{ "name": "Eponine",            "group":  4 },
	{ "name": "Anzelma",            "group":  4 },
	{ "name": "Woman2",             "group":  5 },
	{ "name": "MotherInnocent",     "group":  0 },
	{ "name": "Gribier",            "group":  0 },
	{ "name": "Jondrette",          "group":  7 },
	{ "name": "Mme.Burgon",         "group":  7 },
	{ "name": "Gavroche",           "group":  8 },
	{ "name": "Gillenormand",       "group":  5 },
	{ "name": "Magnon",             "group":  5 },
	{ "name": "Mlle.Gillenormand",  "group":  5 },
	{ "name": "Mme.Pontmercy",      "group":  5 },
	{ "name": "Mlle.Vaubois",       "group":  5 },
	{ "name": "Lt.Gillenormand",    "group":  5 },
	{ "name": "Marius",             "group":  8 },
	{ "name": "BaronessT",          "group":  5 },
	{ "name": "Mabeuf",             "group":  8 },
	{ "name": "Enjolras",           "group":  8 },
	{ "name": "Combeferre",         "group":  8 },
	{ "name": "Prouvaire",          "group":  8 },
	{ "name": "Feuilly",            "group":  8 },
	{ "name": "Courfeyrac",         "group":  8 },
	{ "name": "Bahorel",            "group":  8 },
	{ "name": "Bossuet",            "group":  8 },
	{ "name": "Joly",               "group":  8 },
	{ "name": "Grantaire",          "group":  8 },
	{ "name": "MotherPlutarch",     "group":  0 },
	{ "name": "Gueulemer",          "group":  4 },
	{ "name": "Babet",              "group":  4 },
	{ "name": "Claquesous",         "group":  4 },
	{ "name": "Montparnasse",       "group":  4 },
	{ "name": "Toussaint",          "group":  5 },
	{ "name": "Child1",             "group": 10 },
	{ "name": "Child2",             "group": 10 },
	{ "name": "Brujon",             "group":  4 },
	{ "name": "Mme.Hucheloup",      "group":  8 }
  ],
  
  "nodes2":  [
	{ "name": "Myriel1",             "group":  0 },
	{ "name": "Napoleon1",           "group":  1 },
	{ "name": "Mlle.Baptistine1",    "group":  2 },
	{ "name": "Mme.Magloire1",       "group":  3 },
	{ "name": "CountessdeLo1",       "group":  4 },
	{ "name": "Geborand1",           "group":  5 },
	{ "name": "Champtercier1",       "group":  6 },
	{ "name": "Cravatte1",           "group":  7 },
	{ "name": "Count1",              "group":  8 },
	{ "name": "OldMan1",             "group":  9 },
	{ "name": "Labarre1",            "group":  10 },
	{ "name": "Valjean1",            "group":  11 },
	{ "name": "Marguerite1",         "group":  12 },
	{ "name": "Mme.deR1",            "group":  13 },
	{ "name": "Isabeau1",            "group":  14 },
	{ "name": "Gervais1",            "group":  15 },
	{ "name": "Tholomyes1",          "group":  16 },
	{ "name": "Listolier1",          "group":  17 },
	{ "name": "Fameuil1",            "group":  18 },
	{ "name": "Blacheville1",        "group":  19 },
	{ "name": "Favourite1",          "group":  20 },
  ],

  "links":  [
	{ "source":  1,  "target":  0,  "value":  1 },
	{ "source":  2,  "target":  0,  "value":  8 },
	{ "source":  3,  "target":  0,  "value": 10 },
	{ "source":  3,  "target":  2,  "value":  6 },
	{ "source":  4,  "target":  0,  "value":  1 },
	{ "source":  5,  "target":  0,  "value":  1 },
	{ "source":  6,  "target":  0,  "value":  1 },
	{ "source":  7,  "target":  0,  "value":  1 },
	{ "source":  8,  "target":  0,  "value":  2 },
	{ "source":  0,  "target":  0,  "value":  1 },
	{ "source": 11,  "target": 10,  "value":  1 },
	{ "source": 11,  "target":  3,  "value":  3 },
	{ "source": 11,  "target":  2,  "value":  3 },
	{ "source": 11,  "target":  0,  "value":  5 },
	{ "source": 12,  "target": 11,  "value":  1 },
	{ "source": 13,  "target": 11,  "value":  1 },
	{ "source": 14,  "target": 11,  "value":  1 },
	{ "source": 15,  "target": 11,  "value":  1 },
	{ "source": 17,  "target": 16,  "value":  4 },
	{ "source": 18,  "target": 16,  "value":  4 },
	{ "source": 18,  "target": 17,  "value":  4 },
	{ "source": 19,  "target": 16,  "value":  4 },
	{ "source": 19,  "target": 17,  "value":  4 },
	{ "source": 19,  "target": 18,  "value":  4 },
	{ "source": 20,  "target": 16,  "value":  3 },
	{ "source": 20,  "target": 17,  "value":  3 },
	{ "source": 20,  "target": 18,  "value":  3 },
	{ "source": 20,  "target": 19,  "value":  4 },
	{ "source": 21,  "target": 16,  "value":  3 },
	{ "source": 21,  "target": 17,  "value":  3 },
	{ "source": 21,  "target": 18,  "value":  3 },
	{ "source": 21,  "target": 19,  "value":  3 },
	{ "source": 21,  "target": 10,  "value":  5 },
	{ "source": 22,  "target": 16,  "value":  3 },
	{ "source": 22,  "target": 17,  "value":  3 },
	{ "source": 22,  "target": 18,  "value":  3 },
	{ "source": 22,  "target": 19,  "value":  3 },
	{ "source": 22,  "target": 10,  "value":  4 },
	{ "source": 22,  "target": 11,  "value":  4 },
	{ "source": 23,  "target": 16,  "value":  3 },
	{ "source": 23,  "target": 17,  "value":  3 },
	{ "source": 23,  "target": 18,  "value":  3 },
	{ "source": 23,  "target": 19,  "value":  3 },
	{ "source": 23,  "target": 10,  "value":  4 },
	{ "source": 23,  "target": 1,  "value":  4 },
	{ "source": 23,  "target": 2,  "value":  4 },
	{ "source": 23,  "target": 12,  "value":  2 },
	{ "source": 23,  "target": 11,  "value":  0 },
	{ "source": 24,  "target": 13,  "value":  2 },
	{ "source": 24,  "target": 11,  "value":  7 },
	{ "source": 25,  "target": 14,  "value": 13 },
	{ "source": 25,  "target": 13,  "value":  1 },
	{ "source": 25,  "target": 11,  "value": 12 },
	{ "source": 26,  "target": 14,  "value":  4 },
	{ "source": 26,  "target": 11,  "value": 31 },
	{ "source": 26,  "target": 16,  "value":  1 },
	{ "source": 26,  "target": 15,  "value":  1 },
	{ "source": 27,  "target": 11,  "value": 17 },
	{ "source": 27,  "target": 3,  "value":  5 },
	{ "source": 27,  "target": 5,  "value":  5 },
	{ "source": 27,  "target": 14,  "value":  1 },
	{ "source": 27,  "target": 16,  "value":  1 },
	{ "source": 28,  "target": 11,  "value":  8 },
	{ "source": 28,  "target": 17,  "value":  1 },
	{ "source": 29,  "target": 13,  "value":  1 },
	{ "source": 29,  "target": 7,  "value":  1 },
	{ "source": 29,  "target": 11,  "value":  2 },
	{ "source": 30,  "target": 13,  "value":  1 },
	{ "source": 31,  "target": 10,  "value":  2 },
	{ "source": 31,  "target": 11,  "value":  3 },
	{ "source": 31,  "target": 13,  "value":  2 },
	{ "source": 31,  "target": 17,  "value":  1 },
	{ "source": 32,  "target": 11,  "value":  1 },
	{ "source": 33,  "target": 11,  "value":  2 },
	{ "source": 33,  "target": 17,  "value":  1 },
	{ "source": 34,  "target": 11,  "value":  3 },
	{ "source": 34,  "target": 19,  "value":  2 },
	{ "source": 35,  "target": 11,  "value":  3 },
	{ "source": 35,  "target": 14,  "value":  3 },
	{ "source": 35,  "target": 19,  "value":  2 },
	{ "source": 36,  "target": 14,  "value":  2 },
	{ "source": 36,  "target": 15,  "value":  2 },
	{ "source": 36,  "target": 11,  "value":  2 },
	{ "source": 36,  "target": 19,  "value":  1 },
	{ "source": 37,  "target": 14,  "value":  2 },
	{ "source": 37,  "target": 15,  "value":  2 },
	{ "source": 37,  "target": 16,  "value":  2 },
	{ "source": 37,  "target": 11,  "value":  2 },
	{ "source": 37,  "target": 19,  "value":  1 },
	{ "source": 38,  "target": 14,  "value":  2 },
	{ "source": 38,  "target": 15,  "value":  2 },
	{ "source": 38,  "target": 16,  "value":  2 },
	{ "source": 38,  "target": 17,  "value":  2 },
	{ "source": 38,  "target": 11,  "value":  2 },
	{ "source": 38,  "target": 19,  "value":  1 },
	{ "source": 39,  "target": 5,  "value":  1 },
	{ "source": 40,  "target": 5,  "value":  1 },
	{ "source": 41,  "target": 14,  "value":  2 },
	{ "source": 41,  "target": 15,  "value":  3 },
	{ "source": 42,  "target": 11,  "value":  2 },
	{ "source": 42,  "target": 5,  "value":  2 },
	{ "source": 42,  "target": 4,  "value":  1 },
	{ "source": 43,  "target": 11,  "value":  3 },
	{ "source": 43,  "target": 16,  "value":  1 },
	{ "source": 43,  "target": 17,  "value":  1 },
	{ "source": 44,  "target": 18,  "value":  3 },
	{ "source": 44,  "target": 11,  "value":  1 },
	{ "source": 45,  "target": 18,  "value":  2 },
	{ "source": 47,  "target": 16,  "value":  1 },
	{ "source": 48,  "target": 17,  "value":  2 },
	{ "source": 48,  "target": 15,  "value":  1 },
	{ "source": 48,  "target": 17,  "value":  1 },
	{ "source": 48,  "target": 11,  "value":  1 },
	{ "source": 49,  "target": 16,  "value":  3 },
	{ "source": 49,  "target": 11,  "value":  2 },
	{ "source": 50,  "target": 19,  "value":  1 },
	{ "source": 50,  "target": 14,  "value":  1 },
	{ "source": 51,  "target": 19,  "value":  0 },
	{ "source": 51,  "target": 16,  "value":  2 },
	{ "source": 51,  "target": 11,  "value":  2 },
	{ "source": 52,  "target": 11,  "value":  1 },
	{ "source": 52,  "target": 19,  "value":  1 },
	{ "source": 53,  "target": 11,  "value":  1 },
	{ "source": 54,  "target": 11,  "value":  2 },
	{ "source": 54,  "target": 19,  "value":  1 },
	{ "source": 54,  "target": 16,  "value":  1 },
	{ "source": 55,  "target": 11,  "value":  6 },
	{ "source": 55,  "target": 19,  "value": 12 },
	{ "source": 55,  "target": 9,  "value":  1 },
	{ "source": 55,  "target": 14,  "value":  1 },
	{ "source": 55,  "target": 16,  "value": 21 },
	{ "source": 55,  "target": 1,  "value": 19 },
	{ "source": 55,  "target": 6,  "value":  1 },
	{ "source": 55,  "target": 15,  "value":  2 },
	{ "source": 55,  "target": 3,  "value":  5 },
	{ "source": 55,  "target": 8,  "value":  4 },
	{ "source": 56,  "target": 19,  "value":  1 },
	{ "source": 56,  "target": 15,  "value":  1 },
	{ "source": 57,  "target": 15,  "value":  1 },
	{ "source": 57,  "target": 11,  "value":  1 },
	{ "source": 57,  "target": 18,  "value":  1 },
	{ "source": 58,  "target": 15,  "value":  7 },
	{ "source": 58,  "target": 18,  "value":  7 },
	{ "source": 58,  "target": 17,  "value":  6 },
	{ "source": 58,  "target": 7,  "value":  1 },
	{ "source": 58,  "target": 11,  "value":  4 },
	{ "source": 59,  "target": 18,  "value": 15 },
	{ "source": 59,  "target": 15,  "value":  5 },
	{ "source": 59,  "target": 8,  "value":  6 },
	{ "source": 59,  "target": 7,  "value":  2 },
	{ "source": 60,  "target": 8,  "value":  1 },
	{ "source": 60,  "target": 18,  "value":  4 },
	{ "source": 60,  "target": 19,  "value":  2 },
	{ "source": 61,  "target": 18,  "value":  2 },
	{ "source": 61,  "target": 8,  "value":  6 },
	{ "source": 61,  "target": 6,  "value":  2 },
	{ "source": 61,  "target": 9,  "value":  5 },
	{ "source": 61,  "target": 7,  "value":  1 },
	{ "source": 61,  "target": 5,  "value":  1 },
	{ "source": 62,  "target": 5,  "value":  0 },
	{ "source": 62,  "target": 8,  "value": 17 },
	{ "source": 62,  "target": 9,  "value": 13 },
	{ "source": 62,  "target": 18,  "value":  7 },
	{ "source": 62,  "target": 17,  "value":  2 },
	{ "source": 62,  "target": 11,  "value":  1 },
	{ "source": 62,  "target": 1,  "value":  6 },
	{ "source": 62,  "target": 10,  "value":  3 },
	{ "source": 63,  "target": 19,  "value":  5 },
	{ "source": 63,  "target": 18,  "value":  5 },
	{ "source": 63,  "target": 12,  "value":  6 },
	{ "source": 63,  "target": 17,  "value":  2 },
	{ "source": 63,  "target": 8,  "value":  4 },
	{ "source": 63,  "target": 11,  "value":  3 },
	{ "source": 63,  "target": 6,  "value":  2 },
	{ "source": 63,  "target": 5,  "value":  1 },
	{ "source": 64,  "target": 15,  "value":  5 },
	{ "source": 64,  "target": 12,  "value": 12 },
	{ "source": 64,  "target": 18,  "value":  5 },
	{ "source": 64,  "target": 13,  "value":  4 },
	{ "source": 64,  "target": 8,  "value": 10 },
	{ "source": 64,  "target": 11,  "value":  6 },
	{ "source": 64,  "target": 6,  "value":  2 },
	{ "source": 64,  "target": 5,  "value":  0 },
	{ "source": 64,  "target": 7,  "value":  1 },
	{ "source": 64,  "target": 1,  "value":  1 },
	{ "source": 65,  "target": 3,  "value":  5 },
	{ "source": 65,  "target": 4,  "value":  7 },
	{ "source": 65,  "target": 8,  "value":  3 },
	{ "source": 65,  "target": 2,  "value":  5 },
	{ "source": 65,  "target": 8,  "value":  5 },
	{ "source": 65,  "target": 1,  "value":  5 },
	{ "source": 65,  "target": 6,  "value":  2 },
	{ "source": 65,  "target": 19,  "value":  5 },
	{ "source": 65,  "target": 17,  "value":  1 },
	{ "source": 65,  "target": 15,  "value":  2 },
	{ "source": 66,  "target": 14,  "value":  3 },
	{ "source": 66,  "target": 18,  "value":  3 },
	{ "source": 66,  "target": 19,  "value":  1 },
	{ "source": 66,  "target": 12,  "value":  2 },
	{ "source": 66,  "target": 15,  "value":  2 },
	{ "source": 66,  "target": 8,  "value":  1 },
	{ "source": 66,  "target": 3,  "value":  1 },
	{ "source": 66,  "target": 1,  "value":  1 },
	{ "source": 66,  "target": 6,  "value":  1 },
	{ "source": 67,  "target": 17,  "value":  3 },
	{ "source": 68,  "target": 5,  "value":  5 },
	{ "source": 68,  "target": 1,  "value":  1 },
	{ "source": 68,  "target": 4,  "value":  1 },
	{ "source": 68,  "target": 7,  "value":  1 },
	{ "source": 68,  "target": 8,  "value":  1 },
	{ "source": 68,  "target": 11,  "value":  1 },
	{ "source": 69,  "target": 5,  "value":  6 },
	{ "source": 69,  "target": 8,  "value":  6 },
	{ "source": 69,  "target": 1,  "value":  1 },
	{ "source": 69,  "target": 4,  "value":  1 },
	{ "source": 69,  "target": 7,  "value":  2 },
	{ "source": 69,  "target": 18,  "value":  1 },
	{ "source": 69,  "target": 11,  "value":  1 },
	{ "source": 70,  "target": 5,  "value":  4 },
	{ "source": 70,  "target": 9,  "value":  4 },
	{ "source": 70,  "target": 8,  "value":  4 },
	{ "source": 70,  "target": 1,  "value":  1 },
	{ "source": 70,  "target": 4,  "value":  1 },
	{ "source": 70,  "target": 7,  "value":  1 },
	{ "source": 70,  "target": 11,  "value":  1 },
	{ "source": 70,  "target": 18,  "value":  1 },
	{ "source": 71,  "target": 17,  "value":  1 },
	{ "source": 71,  "target": 9,  "value":  2 },
	{ "source": 71,  "target": 8,  "value":  2 },
	{ "source": 71,  "target": 7,  "value":  2 },
	{ "source": 71,  "target": 1,  "value":  1 },
	{ "source": 71,  "target": 8,  "value":  1 },
	{ "source": 71,  "target": 4,  "value":  1 },
	{ "source": 71,  "target": 5,  "value":  1 },
	{ "source": 72,  "target": 6,  "value":  2 },
	{ "source": 72,  "target": 2,  "value":  1 },
	{ "source": 72,  "target": 20,  "value":  1 },
	{ "source": 73,  "target": 18,  "value":  2 },
	{ "source": 74,  "target": 18,  "value":  2 },
	{ "source": 74,  "target": 3,  "value":  3 },
	{ "source": 75,  "target": 9,  "value":  3 },
	{ "source": 75,  "target": 8,  "value":  3 },
	{ "source": 75,  "target": 5,  "value":  3 },
	{ "source": 75,  "target": 18,  "value":  1 },
	{ "source": 75,  "target": 11,  "value":  1 },
	{ "source": 75,  "target": 10,  "value":  1 },
	{ "source": 75,  "target": 12,  "value":  1 },
	{ "source": 76,  "target": 4,  "value":  1 },
	{ "source": 76,  "target": 5,  "value":  1 },
	{ "source": 76,  "target": 6,  "value":  1 },
	{ "source": 76,  "target": 3,  "value":  1 },
	{ "source": 76,  "target": 2,  "value":  1 },
	{ "source": 76,  "target": 18,  "value":  1 },
	{ "source": 76,  "target": 8,  "value":  1 }
  ]
}

var default_taxonList = [
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
	
var default_gene_names = "Please input names of the interesting gene products. e.g.:<br/>"+
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
   
var default_gene_ids = "Please input accession IDs of the interesting gene products. e.g.:<br/>"+
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

var default_help_reference = 	"Please input the annotations as following:<br/>"+
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