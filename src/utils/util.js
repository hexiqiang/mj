export var tableDbEdit1 = (index,cb) => {  //index为索引号
    var cellabc = document.getElementsByClassName('headerFirst')[index];
    cellabc.innerHTML = "";
    let cellInput = document.createElement("el-input");
    let cellInputSon = document.createElement("input");
    let cellBut = document.createElement("button");
    let ibtu = document.createElement("i");
    cellInputSon.value = this.tableData[index].historical_value;
    cellabc.setAttribute("class", "cellBoxdev");
    ibtu.setAttribute("class", "el-icon-check");
    cellInputSon.setAttribute("class", "el-input__inner compileName");
    cellBut.setAttribute("class", "el-button el-button--warning el-button--mini");
    cellBut.innerText = '确定';
    cellInput.style.width = "100%";
    ibtu.style.marginLeft = "3px";
    cellInputSon.style.width = "60%";
    cellInputSon.style.padding = "0 5px 0 0";
    cellInputSon.style.border = "1px solid transparent";
    this.clickButSty = true;
    cellInput.appendChild(cellInputSon);
    cellabc.appendChild(cellInput);
    cellInput.appendChild(cellBut);
    cellBut.appendChild(ibtu);
    cellBut.onclick = () => { //成功按钮事件
        cellabc.removeChild(cellInput);
        this.tableData[index].historical_value = cellInputSon.value;
        cellabc.innerHTML = this.tableData[index].historical_value;
        let ibtuIcon = document.createElement("i");
        ibtuIcon.setAttribute("class", "el-icon-edit-outline eidtIcon");
        cellabc.appendChild(ibtuIcon);
        cellabc.setAttribute("class", "headerFirst");
        ibtuIcon.onclick = () => {
            this.tableDbEdit(index);
        };
        cb(this.tableData[index].historical_value);
        console.log(this.tableData[index].historical_value)
    }
};