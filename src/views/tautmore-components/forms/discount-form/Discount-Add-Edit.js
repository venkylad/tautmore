import React, { Component } from "react";

import {
  Label,
 
  FormGroup,
  Button,
 
} from "reactstrap";
import { Formik, Field, Form } from "formik";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { formschema_discount } from "../../utility/schema/Fields_Schema";
import "./DiscountForm.scss";
import { ChevronDown } from "react-feather";
import { addDiscount, editDiscount } from "../../services/apis/tautmore_discounts_apis/tautmore_discounts_api";
import moment from "moment";

const discountsign = [
  { value: "USD", label: "USD" },
  { value: "INR", label: "INR" },
];

const discountmethod = [
  { value: "percentage", label: "percentage" },
  { value: "flat", label: "flat" },
];

const typeofdiscount = [
  { value: "Single use", label: "Single use" },
  { value: "Multi use", label: "Multi use" },
];

class DataListSidebar extends Component {
  handleAddSubmit = (obj,title,id) => {
    const { isEditAble } = this.props;
    // console.log(obj, title, id);
    // console.log(obj.phone, "phone");
    let formData = {
      name:obj.discountname,
      code:obj.discountcode,
      discountAmountType:obj.discountmethod.value,
      discountAmount:obj.discountamount,
      discountType:obj.typeofdiscount.value,
      discountUse:obj.noofdiscount,
      expiryDate:obj.expireson,
      description:obj.description,
      currencyCode:obj.discountsign.value
    };


    // this.setState({ isLoading: true });
    if (isEditAble) {
      this.editDiscountData(id,formData);
    } else {
      this.addDiscountData(formData);
    }
  };

  disablepastDates(){
    var date = new Date();
    return moment(date.setDate(date.getDate())).format('YYYY-MM-DD');
  }

  async  addDiscountData (data) {
    try{
      const res = await addDiscount(data);
      if(res.status === 200){
        toast.success("Discount Data Added Successfully");
        this.props.loadData();
        this.props.handleSidebar(false);
      }
      
    }catch(error){
      toast.error(error.message)
    }
  }

  async editDiscountData (id, data){
    localStorage.setItem('discount', data.code)
    try{
      const res = await editDiscount(id,data)
      if(res.status === 200){
        
        toast.success("Discount Data Edited Successfully");
        this.props.loadData();
        this.props.handleSidebar(false);
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  render() {
    let { isEditAble, show, data, title, handleSidebar, idValue } = this.props;
    console.log(data)
    return (
      <>
        <Formik
          enableReinitialize
          //   initialValues={{
          //     name: data?.name || "",
          //     role: data?.role ? { value: data?.role, label: data?.role } : "",
          //     email: data?.email || "",
          //     phone: data?.phone.toString(),
          //     password: "",
          //     repassword: "",
          //   }}
          initialValues={{
            discountname: data?.name || "",
            discountcode: data?.code || "",
            discountamount: data?.discountAmount || "",
            discountsign: data?.currencyCode
              ? { value: data?.currencyCode, label: data?.currencyCode }
              : "",
            discountmethod: data?.discountAmountType
              ? { value: data?.discountAmountType, label: data?.discountAmountType }
              : "",
            // role: data?.role ? { value: data?.role, label: data?.role } : "",
            typeofdiscount: data?.discountType
              ? { value: data?.discountType, label: data?.discountType }
              : "",
            noofdiscount: data?.discountUse || "",
            expireson: moment(data?.expiryDate).format('YYYY-MM-DD') || "",
            description: data?.description || "",
          }}
          validationSchema={formschema_discount(isEditAble)}
          onSubmit={(data, ...rest) => this.handleAddSubmit(data, title, idValue)}
        >
          {({
            errors,
            touched,
            values,
            setFieldValue,
            handleSubmit,
            handleChange,
          }) => {
            console.log(values);
            return (
              <Form onSubmit={handleSubmit}>
                <div
                  className={classnames("data-list-sidebar", {
                    show: show,
                  })}
                >
                  <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
                    <h4>
                      {data && Object.keys(data).length !== 0
                        ? "UPDATE Coupon"
                        : "ADD New Coupon"}
                    </h4>
                    <X
                      size={20}
                      className="cursor-pointer"
                      onClick={() => handleSidebar(false, true)}
                    />
                  </div>

                  <PerfectScrollbar
                    className="data-list-fields px-2 mt-2"
                    options={{ wheelPropagation: false }}
                  >
                    <FormGroup>
                      <Label
                        for="data-name"
                        className="rp-manage-school-input-title"
                      >
                        Discount Name
                      </Label>
                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.discountname &&
                          touched.discountname &&
                          "is-invalid"
                        }`}
                        name="discountname"
                        value={values.discountname}
                        placeholder="Discount Name"
                        onChange={handleChange}
                        id="data-name"
                      />
                      {errors.discountname && touched.discountname ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.discountname}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-description"
                        className="rp-manage-school-input-title"
                      >
                        Discount Code
                      </Label>
                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.discountcode &&
                          touched.discountcode &&
                          "is-invalid"
                        }`}
                        name="discountcode"
                        value={values.discountcode}
                        placeholder="Description"
                        onChange={handleChange}
                        id="data-description"
                      />
                      {errors.discountcode && touched.discountcode ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.discountcode}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-description"
                        className="rp-manage-school-input-title"
                      >
                        Discount Currency
                      </Label>
                      <Select
                        className="React tautmore-admin-selectbox customInputGroup"
                        classNamePrefix="select"
                        name="discountsign"
                        value={values.discountsign}
                        onChange={(e) => {
                          setFieldValue("discountsign", e);
                        }}
                        options={discountsign}
                      />
                      {errors.discountsign && touched.discountsign ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.discountsign}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-category"
                        className="rp-manage-school-input-title"
                      >
                        Discount Type
                      </Label>

                      <Select
                        className="React tautmore-admin-selectbox"
                        classNamePrefix="select"
                        defaultValue={discountmethod[0]}
                        name="discountmethod"
                        value={values.discountmethod}
                        onChange={(e) => {
                          setFieldValue("discountmethod", e);
                        }}
                        options={discountmethod}
                      />
                      {errors.discountmethod && touched.discountmethod ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.discountmethod}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-description"
                        className="rp-manage-school-input-title"
                      >
                        Discount Amount
                      </Label>

                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.discountamount &&
                          touched.discountamount &&
                          "is-invalid"
                        }`}
                        name="discountamount"
                        value={values.discountamount}
                        placeholder="Discount Amount"
                        onChange={handleChange}
                        id="data-description"
                      />

                      {errors.discountamount && touched.discountamount ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.discountamount}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-category"
                        className="rp-manage-school-input-title"
                      >
                        Type Of Discount
                      </Label>

                      <Select
                        className="React tautmore-admin-selectbox"
                        classNamePrefix="select"
                        defaultValue={typeofdiscount[0]}
                        name="typeofdiscount"
                        value={values.typeofdiscount}
                        onChange={(e) => {
                          setFieldValue("typeofdiscount", e);
                        }}
                        options={typeofdiscount}
                      />
                      {errors.typeofdiscount && touched.typeofdiscount ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.typeofdiscount}
                        </div>
                      ) : null}
                    </FormGroup>

                    {values.typeofdiscount.value === "Multi use" ? (
                      <FormGroup>
                        <Label
                          for="data-description"
                          className="rp-manage-school-input-title"
                        >
                          No. of Discounts
                        </Label>

                        <Field
                          type="text"
                          className={`form-control tautmore-input-style ${
                            errors.noofdiscount &&
                            touched.noofdiscount &&
                            "is-invalid"
                          }`}
                          name="noofdiscount"
                          value={values.noofdiscount}
                          placeholder="No. of discounts"
                          onChange={handleChange}
                          id="data-description"
                        />

                        {errors.noofdiscount && touched.noofdiscount ? (
                          <div className="rp-manage-school_error-message mt-25">
                            {errors.noofdiscount}
                          </div>
                        ) : null}
                      </FormGroup>
                    ) : (
                      ""
                    )}

                    <FormGroup>
                      <Label
                        for="date"
                        className="rp-manage-school-input-title"
                      >
                        Expies On
                      </Label>
                      <Field
                        type="date"
                        name="expireson"
                        id="expireson"
                        min={this.disablepastDates()}
                        className={`form-control tautmore-input-style ${
                          errors.expireson && touched.expireson && "is-invalid"
                        }`}
                      />
                      {errors.expireson && touched.expireson ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.expireson}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-description"
                        className="rp-manage-school-input-title"
                      >
                        Description
                      </Label>
                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.description &&
                          touched.description &&
                          "is-invalid"
                        }`}
                        name="description"
                        value={values.description}
                        placeholder="Description"
                        onChange={handleChange}
                        id="data-description"
                      />
                      {errors.description && touched.description ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.description}
                        </div>
                      ) : null}
                    </FormGroup>
                  </PerfectScrollbar>
                  <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
                    <Button
                      type="submit"
                      //   color="dark"
                      className="tautmore-manage-school_submit"
                      // disabled={loader}
                    >
                      <span className="mr-50">
                        {isEditAble ? "Update" : "Add Coupon"}
                      </span>
                    </Button>
                    <Button
                      className="ml-1 rp-manage-school_cancel"
                      color="dark"
                      outline
                      onClick={() => handleSidebar(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        {/* <ToastContainer draggable={false} /> */}
      </>
    );
  }
}

// DataListSidebar.proptType = {
//   data: object.isRequired,
//   loadData: func.isRequired,
//   isEditAble: bool.isRequired,
// };

// const mapStateToProps = (state) => ({
//   addadmin: state.admin.addadmin,
//   editadmin: state.admin.editadmin,
// });

// const mapDispatchToProps = (dispatch) => ({
//   addAdmin: (data) => dispatch(addAdmin(data)),
//   editAdmin: (data) => dispatch(editAdmin(data)),
//   clearEditadmin: () => dispatch({ type: "CLEAR_EDIT_ADMIN" }),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(DataListSidebar);
export default DataListSidebar;
