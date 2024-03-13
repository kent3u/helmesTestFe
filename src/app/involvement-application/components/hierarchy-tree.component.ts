import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {Sector} from "../model/sector";
import {SelectionModel} from "@angular/cdk/collections";
import {orderBy} from "lodash"


interface SectorNode {
  id: number,
  name: string,
  parentId?: number,
  children: SectorNode[]
}

@Component({
  templateUrl: './hierarchy-tree.component.html',
  selector: 'hierarchy-tree',
  styleUrls: ['./hierarchy-tree.component.css']
})
export class HierarchyTreeComponent implements OnInit {

  @Input()
  sectors!: Sector[];
  @Input()
  selectedSectorIds!: number[];
  @Output()
  selectedSectorIdsChange = new EventEmitter<number[]>();

  treeControl!: FlatTreeControl<SectorNode>;
  dataSource!: MatTreeNestedDataSource<SectorNode>;
  checklistSelection = new SelectionModel<number>(true);

  private sectorMap = new Map<number, SectorNode>();

  constructor() {
    this.treeControl = new NestedTreeControl<SectorNode>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<SectorNode>();
  }

  ngOnInit(): void {
    this.dataSource.data = this.getDatasourceDataFromSectors(this.sectors);
    this.checklistSelection.select(...this.selectedSectorIds)
    this.selectedSectorIds.forEach(id => this.treeControl.expand(this.sectorMap.get(id)!))
  }

  hasChild = (_: number, node: SectorNode) =>
    node.children && node.children.length > 0;

  isNodeSelected(node: SectorNode): boolean {
    return this.checklistSelection.isSelected(node.id);
  }

  nodeSelectionToggle(node: SectorNode): void {
    this.checklistSelection.toggle(node.id);
    const parentIds = this.findParentIdsRecursively(node);
    // if node was selected, select parents up to root
    // if node was deselected, deselect all descendants up to leaf
    this.checklistSelection.isSelected(node.id) ? this.checklistSelection.select(...parentIds)
      : this.checklistSelection.deselect(...this.treeControl.getDescendants(node).map((node) => node.id));
    this.selectedSectorIdsChange.emit(this.checklistSelection.selected);
  }

  private getDatasourceDataFromSectors(sectors: Sector[]): SectorNode[] {
    orderBy(sectors, ['name']).forEach((sector) => {
      this.sectorMap.set(sector.id, {...sector, children: []})
    })

    const sectorNodes = Array.from(this.sectorMap.values());
    sectorNodes.forEach((sectorNode) => {
      if (sectorNode.parentId) {
        this.sectorMap.get(sectorNode.parentId)?.children.push(this.sectorMap.get(sectorNode.id)!)
      }
    })

    return sectorNodes.filter((sector) => !sector.parentId);
  }

  private findParentIdsRecursively(node: SectorNode): number[] {
    if (!node.parentId) {
      return [];
    }
    const parentNode = this.sectorMap.get(node.parentId);
    return [parentNode!.id, ...this.findParentIdsRecursively(parentNode!)]
  }
}
