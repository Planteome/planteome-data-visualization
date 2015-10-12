{
	"results": {
		"is_obsolete": "false",
		"alternate_ids": [],
		"name": "neurogenesis",
		"subsets": [],
		"term_dbxref_links": [{
			"dbname": "GOC",
			"link": null,
			"key": "dph",
			"id": "GOC:dph"
		},
		{
			"id": "GOC:dgh",
			"key": "dgh",
			"link": null,
			"dbname": "GOC"
		},
		{
			"link": null,
			"key": "jid",
			"id": "GOC:jid",
			"dbname": "GOC"
		},
		{
			"dbname": "GO_REF",
			"key": "0000021",
			"link": "http://www.geneontology.org/cgi-bin/references.cgi#GO_REF:0000021",
			"id": "GO_REF:0000021"
		},
		{
			"id": "GOC:curators",
			"key": "curators",
			"link": null,
			"dbname": "GOC"
		},
		{
			"dbname": "GOC",
			"key": "cls",
			"link": null,
			"id": "GOC:cls"
		},
		{
			"dbname": "GOC",
			"id": "GOC:mtg_15jun06",
			"key": "mtg_15jun06",
			"link": null
		}],
		"topology_graph_json": "{
			\"nodes\":
			[
				{\"id\":\"GO:0044763\",\"lbl\":\"single-organism cellular process\"},
				{\"id\":\"GO:0009987\",\"lbl\":\"cellular process\"},
				{\"id\":\"GO:0044699\",\"lbl\":\"single-organism process\"},
				{\"id\":\"GO:0044767\",\"lbl\":\"single-organism developmental process\"},
				{\"id\":\"GO:0048869\",\"lbl\":\"cellular developmental process\"},
				{\"id\":\"GO:0048731\",\"lbl\":\"system development\"},
				{\"id\":\"GO:0007275\",\"lbl\":\"multicellular organismal development\"},
				{\"id\":\"GO:0030154\",\"lbl\":\"cell differentiation\"},
				{\"id\":\"GO:0048856\",\"lbl\":\"anatomical structure development\"},
				{\"id\":\"GO:0007399\",\"lbl\":\"nervous system development\"},
				{\"id\":\"GO:0008150\",\"lbl\":\"biological_process\"},
				{\"id\":\"GO:0050769\",\"lbl\":\"positive regulation of neurogenesis\"},
				{\"id\":\"GO:0042063\",\"lbl\":\"gliogenesis\"},
				{\"id\":\"GO:0022008\",\"lbl\":\"neurogenesis\"},
				{\"id\":\"GO:0050767\",\"lbl\":\"regulation of neurogenesis\"},
				{\"id\":\"GO:0032502\",\"lbl\":\"developmental process\"},
				{\"id\":\"GO:0050768\",\"lbl\":\"negative regulation of neurogenesis\"},
				{\"id\":\"GO:0032501\",\"lbl\":\"multicellular organismal process\"},
				{\"id\":\"GO:0048699\",\"lbl\":\"generation of neurons\"},
				{\"id\":\"GO:0044707\",\"lbl\":\"single-multicellular organism process\"}
			],
			
			\"edges\":
			[
				{\"sub\":\"GO:0044767\",\"obj\":\"GO:0032502\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0042063\",\"obj\":\"GO:0022008\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0030154\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0048731\",\"obj\":\"GO:0048856\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0007399\",\"obj\":\"GO:0048731\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0050769\",\"obj\":\"GO:0022008\",\"pred\":\"positively_regulates\"},
				{\"sub\":\"GO:0048869\",\"obj\":\"GO:0044763\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0048869\",\"obj\":\"GO:0044767\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0044763\",\"obj\":\"GO:0044699\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0048731\",\"obj\":\"GO:0007275\",\"pred\":\"part_of\"},
				{\"sub\":\"GO:0044767\",\"obj\":\"GO:0044699\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0007275\",\"obj\":\"GO:0044707\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0007399\",\"pred\":\"part_of\"},
				{\"sub\":\"GO:0032501\",\"obj\":\"GO:0008150\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0032502\",\"obj\":\"GO:0008150\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0048856\",\"obj\":\"GO:0032502\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0044699\",\"obj\":\"GO:0008150\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0050768\",\"obj\":\"GO:0022008\",\"pred\":\"negatively regulates\"},
				{\"sub\":\"GO:0048699\",\"obj\":\"GO:0022008\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0044763\",\"obj\":\"GO:0009987\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0009987\",\"obj\":\"GO:0008150\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0050767\",\"obj\":\"GO:0022008\",\"pred\":\"regulates\"},
				{\"sub\":\"GO:0030154\",\"obj\":\"GO:0048869\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0044707\",\"obj\":\"GO:0044699\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0007275\",\"obj\":\"GO:0044767\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0007399\",\"obj\":\"GO:0048856\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0044707\",\"obj\":\"GO:0032501\",\"pred\":\"is_a\"}
			]
		}",
		
		"consider_info": [],
		"regulates_transitivity_graph_json": "{
			\"nodes\":
			[
				{\"id\":\"GO:0044763\",\"lbl\":\"single-organism cellular process\"},
				{\"id\":\"GO:0009987\",\"lbl\":\"cellular process\"},
				{\"id\":\"GO:0044699\",\"lbl\":\"single-organism process\"},
				{\"id\":\"GO:0044767\",\"lbl\":\"single-organism developmental process\"},
				{\"id\":\"GO:0048869\",\"lbl\":\"cellular developmental process\"},
				{\"id\":\"GO:0007275\",\"lbl\":\"multicellular organismal development\"},
				{\"id\":\"GO:0048731\",\"lbl\":\"system development\"},
				{\"id\":\"GO:0030154\",\"lbl\":\"cell differentiation\"},
				{\"id\":\"GO:0007399\",\"lbl\":\"nervous system development\"},
				{\"id\":\"GO:0048856\",\"lbl\":\"anatomical structure development\"},
				{\"id\":\"GO:0008150\",\"lbl\":\"biological_process\"},
				{\"id\":\"GO:0022008\",\"lbl\":\"neurogenesis\"},
				{\"id\":\"GO:0032502\",\"lbl\":\"developmental process\"},
				{\"id\":\"GO:0032501\",\"lbl\":\"multicellular organismal process\"},
				{\"id\":\"GO:0044707\",\"lbl\":\"single-multicellular organism process\"}
			],
			\"edges\":
			[
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0007399\",\"pred\":\"part_of\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0032502\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0007275\",\"pred\":\"part_of\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0030154\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0048856\",\"pred\":\"part_of\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0044763\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0008150\",\"pred\":\"part_of\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0044707\",\"pred\":\"part_of\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0044767\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0032502\",\"pred\":\"part_of\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0044699\",\"pred\":\"part_of\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0009987\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0048869\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0032501\",\"pred\":\"part_of\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0044699\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0008150\",\"pred\":\"is_a\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0044767\",\"pred\":\"part_of\"},
				{\"sub\":\"GO:0022008\",\"obj\":\"GO:0048731\",\"pred\":\"part_of\"}
			]
		}",
		"ontology_readable": "biological_process",
		"comment": "This term was added by GO_REF:0000021.",
		"synonyms": ["nervous system cell generation","neural cell differentiation"],
		"term_link": "http://amigo.geneontology.org/amigo/term/GO:0022008",
		"definition": "Generation of cells within the nervous system.",
		"dbxrefs": ["Wikipedia:Neurogenesis"],
		"chewable_graph": null,
		"term_dbxrefs": ["GOC:dph",
		"GOC:dgh",
		"GOC:jid",
		"GO_REF:0000021",
		"GOC:curators",
		"GOC:cls",
		"GOC:mtg_15jun06"],
		"acc": "GO:0022008",
		"dbxref_links": [{
			"key": "Neurogenesis",
			"link": "http://en.wikipedia.org/wiki/Neurogenesis",
			"id": "Wikipedia:Neurogenesis",
			"dbname": "Wikipedia"
		}],
		"replaced_by_info": [],
		"ontology": "biological_process"
	},
	"errors": [],
	"type": "term",
	"warnings": [],
	"arguments": {
		
	}
}