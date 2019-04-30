import { Component } from "@angular/core";
import { SubQueryPageDynamic } from "app/libs/dynamic/base/struct/IDynamic";

@Component({
  selector: "select-option-page",
  templateUrl: "./select-option.component.html",
  styleUrls: ["./select-option.component.css"]
})
export class SelectOptionPageComponent {
  selectParamSubQuery: SubQueryPageDynamic = {
    alias: "sub-query-page",
    mainQueryDynamic: {
      alias: "zorro-view-query",
      queryDynamics: [
        { label: "选择类型", alias: "zorro-query-select", filter: [{ key: "selectParamType", condition: "=", value: "" }] },
        { label: "请搜索关键字", alias: "zorro-query-input", filter: [{ key: "title", condition: "contains", value: "" }] }
      ]
    },
    mainDynamic: {
      alias: 'zorro-view-menu'
    },
    subDynamic: {
      alias: 'zorro-view-table'
    }
  }

  panels = [
    {
      active: true,
      disabled: false,
      name: '项目规模',
      children: [{ name: "50人数" }, { name: "100人数" }]
    },
    {
      active: false,
      disabled: true,
      name: '项目规模',
      children: [{ name: "50人数" }, { name: "100人数" }]
    },
    {
      active: false,
      disabled: false,
      name: '项目规模',
      children: [{ name: "50人数" }, { name: "100人数" }]
    }
  ];

  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}