import React from "react";

class CheckSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.isChecked,
        };
    }

    render() {
        return (
        <div
            className={
                "form-control check-select " +
                (this.state.checked ? "bg-primary hover:bg-primary-focus " : "bg-base-100 hover:bg-base-200 ")
            }
            onClick={
                ()=>{
                    this.setState({checked: !this.state.checked})
                }
            }
        >
            <label className="label cursor-pointer">
                <span
                    className=
                    {
                        "label-text flex gap-2 font-bold " + 
                        (this.state.checked ? "text-white" : "")
                    }
                >
                    {this.props.children}
                </span> 
            </label>
        </div>
        );
    }
}

export default CheckSelect;