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
