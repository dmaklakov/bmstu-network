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
  selector: 'bc-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  public back;

  constructor(private readonly api: ApiService) {}

  public update(root) {
    const svg = d3.select('svg');
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
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));
      var nodes = [];
      var links = [];       

        function click(d) {
          console.log(d);
          this.back = CardComponent;
        }      
          

        var id = 0;
        function recurse(node) {
          if (!node.id) node.id = ++id;
          nodes.push(node);
          if (node.children) {
            node.children.forEach(function(item, i, arr) {
              //if (item["ch"])
              links.push({"source":node, "target":item["child"], "distance":item["edge_length"]});
              recurse(item['child']);
            });
          }
        }

        recurse(root);

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
          .on("click", click)
          .attr('cursor', 'pointer')
          
        const label = svg.append('g')
          .selectAll('text')
          .data(graph.nodes)
          .enter().append('text')
          .text(function (node:any)  {return node.first_name + '\r\n' + node.last_name; })
          .attr('font-size', 10)
          .attr('dx', -25)
          .attr('text-align', 'center')
          .on("click", click)
          .attr('cursor', 'pointer')
          .attr('user-select', 'none')
          .attr('font-weight', function(node:any) { 
            if (node['index'] == 0) { return 500; }
            return 300;
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
    this.api.getGraphBySmth(0, {}).then(result => {
      var root = result['graph'];
      this.update(root);
    });
  }
}