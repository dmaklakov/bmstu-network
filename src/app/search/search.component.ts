import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { CardComponent } from '../card/card.component'
import { ApiService } from '../api.service';

import * as d3 from 'd3';

class Node implements d3.SimulationNodeDatum {
  index?: number;
  id: string;
  group: number;
};

class Link {
  source: string;
  target: string;
  distance: number;
};

class Graph {
  nodes: Node[];
  links: Link[];
};

@Component({
  selector: 'bc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public back;
  public root;

  tagArray: string[] = [
    "музыка",
    "кино",
    "книги",
    "спорт",
    "технологии",
    "развлечения",
    "путешествия",
    "животные",
    "наука",
    "история",
    "еда",
    "природа",
    "мода",
  ]

  clickArray: object = {
    "музыка": 0,
    "кино": 0,
    "книги": 0,
    "спорт": 0,
    "технологии": 0,
    "развлечения": 0,
    "путешествия": 0,
    "животные": 0,
    "наука": 0,
    "история": 0,
    "еда": 0,
    "природа": 0,
    "мода": 0,
  }

  lighten = 'white'

  test() {
    this.clickArray[0] = !this.clickArray[0]
    console.log(this.clickArray)
  }

  sendFilters(jsonFilters: object) {
    this.api.getGraphBySmth(0, jsonFilters).then(result => {
      this.root = result['graph'];
      this.update();
    });
  }


  constructor(private readonly api: ApiService) {}
  
   update = () => {
    const svg = d3.select('svg');
    svg.selectAll("*").remove();
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    var colors = { "спорт": "#3182bd",
      "музыка": "#ff0000",
      "кино": "#00ff00",
      "книги": "#0000ff",
      "технологии": "#f8d83c",
      "развлечения": "#c6dbef",
      "путешествия": "#ffefd5",
      "животные": "#ffc0cb",
      "наука": "#9370db",
      "история": "#a52a2a",
      "еда": "#00bfff",
      "природа": "#9acd32",
      "мода": "#808000" };

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-20))
      .force('center', d3.forceCenter(width / 2, height / 2));
      var nodes = [];
      var links = [];           
          

        var id = 0;
        function recurse(node) {
          if (!node.id) node.id = ++id;
          nodes.push(node);
          if (node.children) {
            node.children.forEach(function(item, i, arr) {
              links.push({"source":node, "target":item["child"], "distance":item["edge_length"]});
              recurse(item['child']);
            });
          }
        }

        recurse(this.root);

        const graph: Graph = <Graph>{ nodes, links };


        const link = svg.append('g')
          .attr('class', 'link')
          .selectAll('line')
          .data(graph.links)
          .enter()
          .append('line')
          .attr('stroke', "#f00");

        const node = svg.append('g')
          .attr('class', 'node')
          .selectAll('circle')
          .data(graph.nodes)
          .enter()
          .append('circle')
          .attr('r', 10)  
          .attr('fill', function(d: any) { return colors[d.tag]; })
          .attr('stroke', function(d: any) { return colors[d.tag]; })
		  .on("click", this.click)
          .attr('cursor', 'pointer')
          
        const label = svg.append('g')
          .selectAll('text')
          .data(graph.nodes)
          .enter().append('text')
          .text(function (node:any)  {return node.first_name + '\r\n' + node.last_name; })
          .attr('font-size', (node:any) => {
            if (node['last_name'] == this.root['last_name']) { return '11px'; }
            else { return '10px'; }
          })
          .attr('text-align', 'center')
          .on("click", this.click)
          .attr('cursor', 'pointer')
          .attr('user-select', 'none')
		  .attr('text-anchor', 'middle')
          .attr('font-weight', (node) => { 
            if (node['last_name'] == this.root['last_name']) { return '600'; }
            return '300';
          })

        svg.selectAll('circle').call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
        );

        

        simulation
          .nodes(graph.nodes)
          .on('tick', ticked);

        simulation.force<d3.ForceLink<any, any>>('link')
          .links(graph.links)
          .distance(function(link, i, links) { return link.distance * 5; });

        function ticked() {
          link
            .attr('x1', function(d: any) { return d.source.x; })
            .attr('y1', function(d: any) { return d.source.y; })
            .attr('x2', function(d: any) { return d.target.x; })
            .attr('y2', function(d: any) { return d.target.y; });

          node
            .attr('cx', function(d: any) { return d.x; })
            .attr('cy', function(d: any) { return d.y; });
          label
            .attr('x', function(d: any) { return d.x; })
            .attr('y', function(d: any) { return d.y; });
        }

    function dragstarted(d) {
      if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) { simulation.alphaTarget(0); }
      d.fx = null;
      d.fy = null;
    }
  }

  ngOnInit() {
    //this.api.getGraphBySmth(0, {}).then(result => {
    //  this.root = result['graph'];
	this.root = {
  "avatar_photo": "https://sun1-96.userapi.com/impf/c851320/v851320254/10de9d/XTrBNM7_N1g.jpg?size=400x0&quality=90&sign=c189054a936c679382a6693f22f7c322&c_uniq_tag=BM1zUKpvw4Qz8GKT_bYEKR4XsEXY8rJTZXt-iDvQN88&ava=1",
  "bdate": "4.10.2000",
  "children": [
    {
      "child": {
        "avatar_photo": "https://sun9-19.userapi.com/c639523/v639523859/51f5f/z3hVpsVJy4M.jpg?ava=1",
        "children": [
          {
            "child": {
              "avatar_photo": "https://sun1-91.userapi.com/impg/c856016/v856016912/18ce5e/tnMf3BAzizk.jpg?size=400x0&quality=90&sign=ae98214ce4e9fd8d4d9c4caf27caed8a&c_uniq_tag=IFBrWPtMLjhuUlOhjTMm7XHu9KBdTAr3pp-wJmuPVgM&ava=1",
              "bdate": "17.5.1917",
              "children": [],
              "first_name": "Куруш",
              "interests": "Интересные",
              "is_leaf": true,
              "last_name": "Казиков",
              "photos": [
                "https://sun1-87.userapi.com/c853428/v853428878/2105d5/FS7lUberx5E.jpg",
                "https://sun1-85.userapi.com/c857120/v857120057/c3d50/HcCASF61PlY.jpg",
                "https://sun1-21.userapi.com/c850608/v850608057/9a149/xdz8jzK0ZTk.jpg"
              ],
              "sex": 2,
              "tag": "наука",
              "vk_link": "vk.com/id224604789"
            },
            "edge_length": 15
          },
          {
            "child": {
              "bdate": "8.8.2000",
              "children": [],
              "city": {
                "id": 859,
                "title": "Королёв"
              },
              "country": {
                "id": 1,
                "title": "Россия"
              },
              "first_name": "Костян",
              "interests": "",
              "is_leaf": true,
              "last_name": "Коннов",
              "sex": 2,
              "tag": "наука",
              "vk_link": "vk.com/id173426075"
            },
            "edge_length": 16
          },
          {
            "child": {
              "bdate": "9.1",
              "children": [],
              "city": {
                "id": 312,
                "title": "Мытищи"
              },
              "country": {
                "id": 1,
                "title": "Россия"
              },
              "first_name": "Иван",
              "interests": "",
              "is_leaf": true,
              "last_name": "Кобаренков",
              "sex": 2,
              "tag": "наука",
              "vk_link": "vk.com/id219871227"
            },
            "edge_length": 20
          },
          {
            "child": {
              "bdate": "9.11.2000",
              "children": [],
              "city": {
                "id": 1,
                "title": "Москва"
              },
              "country": {
                "id": 1,
                "title": "Россия"
              },
              "first_name": "Иван",
              "interests": "",
              "is_leaf": true,
              "last_name": "Коваленко",
              "sex": 2,
              "tag": "технологии",
              "vk_link": "vk.com/id68754360"
            },
            "edge_length": 20
          }
        ],
        "city": "Москва",
        "country": "Россия",
        "first_name": "Георгий",
        "is_leaf": false,
        "last_name": "Куликов",
        "sex": 2,
        "tag": "наука",
        "vk_link": "vk.com/id216086560"
      },
      "edge_length": 5
    },
    {
      "child": {
        "children": [
          {
            "child": {
              "bdate": "28.5",
              "children": [],
              "city": {
                "id": 1,
                "title": "Москва"
              },
              "country": {
                "id": 1,
                "title": "Россия"
              },
              "first_name": "Иван",
              "is_leaf": true,
              "last_name": "Аникин",
              "sex": 2,
              "tag": "наука",
              "vk_link": "vk.com/id54836834"
            },
            "edge_length": 44
          }
        ],
        "city": {
          "id": 1,
          "title": "Москва"
        },
        "country": {
          "id": 1,
          "title": "Россия"
        },
        "first_name": "Кристина",
        "interests": "",
        "is_leaf": false,
        "last_name": "Ловцова",
        "sex": 1,
        "tag": "наука",
        "vk_link": "vk.com/id438538486"
      },
      "edge_length": 6
    },
    {
      "child": {
        "bdate": "28.9",
        "children": [],
        "city": {
          "id": 95,
          "title": "Нижний Новгород"
        },
        "country": {
          "id": 1,
          "title": "Россия"
        },
        "first_name": "Маруся",
        "interests": "",
        "is_leaf": true,
        "last_name": "Елизарова",
        "sex": 1,
        "tag": "наука",
        "vk_link": "vk.com/id142813120"
      },
      "edge_length": 7
    },
    {
      "child": {
        "avatar_photo": "https://sun1-19.userapi.com/impf/c852024/v852024171/1a57e8/jpHv7vDRl_I.jpg?size=400x0&quality=90&sign=1ec70b3d7e1f09eb14f3b27ef180beda&c_uniq_tag=9fO-CrKx6EeDJk6IcTRVmkNdIdpgg8zk-GC3v7nmNeA&ava=1",
        "bdate": "31.8",
        "children": [],
        "city": "Москва",
        "country": "Россия",
        "first_name": "Дима",
        "interests": "",
        "is_leaf": true,
        "last_name": "Искандаров",
        "photos": [
          "https://sun1-28.userapi.com/c852024/v852024171/1a57e1/sip0omOv7Jc.jpg",
          "https://sun1-26.userapi.com/c852016/v852016571/190fa8/xIYw1Z21-a8.jpg",
          "https://sun1-19.userapi.com/c855424/v855424309/85f0a/zU3gLq2vZNY.jpg"
        ],
        "sex": 2,
        "tag": "наука",
        "vk_link": "vk.com/id225740326"
      },
      "edge_length": 10
    }
  ],
  "city": "Москва",
  "country": "Россия",
  "first_name": "Дарья",
  "interests": "",
  "is_leaf": false,
  "last_name": "Жгулёва",
  "sex": 1,
  "tag": "наука",
  "vk_link": "vk.com/id115449053"
}
	  function get_start(node) {
          if (node.children) {
			node._children = node.children
			node.children = null;
			node._children.forEach(function(item, i, arr) {
				get_start(item['child']);
            });
          }
        }
		get_start(this.root);
		this.root.children = this.root._children;
		this.root._children = null;
		this.root.children.forEach(function(item, i, arr) {
			item['child'].children = item['child']._children;
			item['child']._children = null;
		});
      this.update();
    //});
  }

  click = (d) => {
    if (d3.event.defaultPrevented) return; // ignore drag
    if (d3.event.shiftPressed) {
		if (d.children) {
		  d._children = d.children;
		  d.children = null;
		} else {
		  d.children = d._children;
		  d._children = null;
		}
	}
	else {
		if (d.token) {
			window.open('http://127.0.0.1:4200/user/' + d.token, '_blank');
		}
		else {
			window.open('http://' + d.vk_link, '_blank');
		}
	}
	this.update();
	}
}
