import Head from "next/head";
import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import landingPageCSS from "./styles/landingpage.module.css"
import absoluteBackgroundsCSS from "./styles/absolutebackgrounds.module.css"
import textCSS from "./styles/text.module.css"
import axios from "axios";
import Swal from "sweetalert2";
import { PuffLoader } from "react-spinners";
class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email_id: "",
      mobile_no: "",
      is_loading: false,
      email_id_error: false,
      mobile_no_error: false,
      show_mobile_modal: false,
      sms_sent: false,
      show_highlighted_offer: false,
      windowWidth: 1512
    }
  }
  componentDidMount(){
    const newState = {...this.state}
    newState.windowWidth = window.innerWidth
    this.setState(newState)
    window.addEventListener("resize", () => {
      const newState = {...this.state}
      newState.windowWidth = window.innerWidth
      this.setState(newState)
    })
  }
  inputChangeHandler(e){
    const newState = {...this.state}
    newState[e.target.name] = e.target.value
    newState[e.target.name + "_error"] = false
    this.setState(newState)
  }
  inputKeyUpHandler(e){
    const newState = {...this.state}
    if(e.key == "Enter"){
      if(e.target.value.length == 0){
        newState[e.target.name + "_error"] = true
        this.setState(newState)
      }else{
        newState[e.target.name + "_error"] = false
        this.setState(newState)
        this.saveMobileNumber()
      }
    }
  }
  async saveEmail(){
    var email = this.state.email_id.toLowerCase()
    if(email.length == 0) {
      const newState = {...this.state}
      newState.email_id_error = true
      this.setState(newState)
      return
    }
    if(!email.toLowerCase().includes("@gmail.com") || email.length <= 10) return this.fireMessage("Invalid Email", "Please enter valid email associated to your google account", "error")
    try{
      console.log("We are here")
      this.setLoader(true)
      console.log("We are here 2")
      var response = await axios.post("https://script.google.com/macros/s/AKfycbzS5hkoYUQfU5lHO2pYThw3CP683WuXez-Xalc23eXZ-CG2Lw_id_MdniMeNXkDS1Bl/exec", {"data": [email, "no"]}, {
        headers:{
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
      console.log(response.data)
      this.setLoader(false)
      if(response.data.error === false){
        const newState = {...this.state}
        newState.show_mobile_modal = true
        this.setState(newState)
      }
    }catch(error){
      this.setLoader(false)
      console.log(error)
      this.fireMessage("Oops!", "An unknown error occured", "error")
    }
  }
  async saveMobileNumber(){
    var mobileno = this.state.mobile_no
    if(mobileno.length != 10) {
      this.fireMessage("Invalid Mobile Number!", "Your mobile number should be exactly 10 digits", "error")
      const newState = {...this.state}
      newState.mobile_no_error = true
      this.setState(newState)
      return
    }
    try{
      this.setLoader(true)
      var response = await axios.post("https://api.crypso.club/app/inviteLink", {"mobileNumber": mobileno}, {
        headers:{
          "Content-Type": "application/json"
        }
      })
      this.setLoader(false)
      const newState = {...this.state}
      newState.sms_sent = true
      newState.show_mobile_modal = true
      this.setState(newState)
    }catch(error){
      this.setLoader(false)
      const newState = {...this.state}
      newState.sms_sent = true
      newState.show_mobile_modal = true
      this.setState(newState)
    }
  }
  onCloseModalClicked(e){
    e.stopPropagation()
    const newState = {...this.state}
    newState.show_mobile_modal = false
    this.setState(newState)
  }
  onCloseOfferClicked(e){
    const newState = {...this.state}
    newState.show_highlighted_offer = false
    this.setState(newState)
  }
  setLoader(is_loading){
    const newState = {...this.state}
    newState.is_loading = is_loading
    this.setState(newState)
  }
  renderMobileModalDownloadForm(){
    return <div className={landingPageCSS.mobile_modal_form_wrapper}>
      <div className={textCSS.text31}><span className={textCSS.text29}>Enter the mobile number <span className={textCSS.text30}>(optional)</span></span> to get the app link via SMS</div>
      <div className={landingPageCSS.mobile_modal_download_form}>
        <div className={landingPageCSS.mobile_modal_input_container}>
          <div className={landingPageCSS.mobile_modal_input_content}>
              <img className={landingPageCSS.mobile_modal_input_country_flag} src="flag_india.png"/>
              <div className={textCSS.text32}>+91 - </div>
              <input placeholder="Enter your Phone Number" value={this.state.mobile_no} onChange={this.inputChangeHandler.bind(this)} className={landingPageCSS.mobile_modal_input} name="mobile_no"/>
          </div>
        </div>
        <div className={landingPageCSS.mobile_modal_button} onClick={this.saveMobileNumber.bind(this)}>
          <p className={textCSS.text18}>Get app link</p>
        </div>
      </div>
    </div>
  }
  renderMobileModalSuccessView(){
    return <div className={landingPageCSS.mobile_modal_success_wrapper}>
      <div className={landingPageCSS.mobile_modal_success_container}>
        <img className={landingPageCSS.mobile_modal_success_check_image} src="green_transparent_check.png"/>
        <div className={textCSS.text33}>We will send you the app download link within next 10 mins.</div>
      </div>
      <div className={landingPageCSS.continue_button} onClick={this.onCloseModalClicked.bind(this)}>
        <div className={textCSS.text34}>Continue to Website</div>
        <img className={landingPageCSS.continue_button_image} src="arrow_forward.png"/>
      </div>
    </div>
  }
  renderMobileModal(){
    return <div id="model_base" className={landingPageCSS.mobile_modal_base} onClick={this.onCloseModalClicked.bind(this)}>
      <div className={landingPageCSS.mobile_modal_container} onClick={(e) => {e.stopPropagation()}}>
        <img alt="Close Icon" src="cross.png" className={landingPageCSS.modal_close_icon} onClick={this.onCloseModalClicked.bind(this)}/>
        <div alt="Gift Box" className={landingPageCSS.mobile_modal_image}></div>
        <div className={textCSS.text21}>Congrats!</div>
        <div className={textCSS.text22}>We’ve shared the app link<br/>with <span className={textCSS.text23}>{this.state.mobile_no}</span></div>
        <div className={landingPageCSS.sectional_desktop_padding_50}></div>
        <div className={landingPageCSS.show_on_mobile_only}>
          <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=club.crypso.app">
            <div className={landingPageCSS.modal_download_button}>
              <img className={landingPageCSS.mobile_modal_play_store_icon} src="play_store_icon.png"/>
              Download the App
            </div>
          </a>
        </div>
        {/* {this.state.sms_sent?this.renderMobileModalSuccessView():this.renderMobileModalDownloadForm()} */}
        
      </div>
    </div>
  }
  renderHighlightedOffer(){
    return <div className={landingPageCSS.highlighted_offer}>
      <Row className="no-gutters" style={{display: "flex", alignItems: "center"}}>
        <Col xs={11}>
          <p className={textCSS.text19}><span className={textCSS.text20}><span className={textCSS.text35}>₹</span>1 Crore+</span> worth rewards for the first 2000 users</p>
        </Col>
        <Col xs={1}>
        <img alt="" src="close.png" className={landingPageCSS.offer_close_icon} onClick={this.onCloseOfferClicked.bind(this)}/>
        </Col>
      </Row>
    </div>
  }
  showLoader(){
    return <div className={landingPageCSS.mobile_modal_base_transparent}>
      <PuffLoader color={"#5E23DC"} loading={true} css={{display: "block", margin: "0 auto", borderColor: "#514A86"}} size={150} />
    </div>
  }
  render(){
    return (<div className={landingPageCSS.container}>
      {this.state.is_loading?this.showLoader():null}
      {this.state.show_mobile_modal?this.renderMobileModal():null}
      <Head>
        <title>Crypso | Learn, Invest &amp; Ride the crypto revolution</title>
      </Head>
      <div className={landingPageCSS.background_wrapper} >
        <div className={absoluteBackgroundsCSS.absolute_background_5}></div>
        <div className={absoluteBackgroundsCSS.absolute_background_6}></div>
        <div className={absoluteBackgroundsCSS.absolute_background_7}></div>
        <div className={absoluteBackgroundsCSS.absolute_background_8}></div>
        <div className={absoluteBackgroundsCSS.absolute_background_9}></div>
      </div>
      <header>
        {this.state.show_highlighted_offer?this.renderHighlightedOffer():null}
        <Row className="no-gutters">
          <Col xs={6}>
            <div className={landingPageCSS.header_logo_container}><p className={landingPageCSS.header_logo}><img alt="Crypso Logo" className={landingPageCSS.header_logo_image} src="crypso_logo.png"/></p></div>
          </Col>
          <Col xs={6}>
            <div className={landingPageCSS.header_buttons_container}>
            <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=club.crypso.app">
              <div className={landingPageCSS.header_download_icon_button}>
                <img className={landingPageCSS.icon_button_icon} src="play_store_icon.png"/>
                <span className={landingPageCSS.text_spacer_horizontal_responsive_14px}/>
                <p className={textCSS.text37}>Download App</p>
              </div>
            </a>
            </div>
          </Col>
        </Row>
      </header>
      <div className={landingPageCSS.header_padding}></div>
      <section className={landingPageCSS.carousel_section}>
      <div className={absoluteBackgroundsCSS.absolute_background_1}></div>
      <div className={absoluteBackgroundsCSS.absolute_background_2}></div>
      <div className={absoluteBackgroundsCSS.absolute_background_4}></div>
        <div className={landingPageCSS.carousel_content}>
          <Row className="no-gutters">
            <Col md={7} className={landingPageCSS.carousel_wrapper}>
              <div className={landingPageCSS.carousel_text_content}>
                <div className={textCSS.text1}>Want to know all about Crypto?</div>
                <span className={landingPageCSS.text_spacer_responsive_32px}></span>
                <h1 className={textCSS.text2}>Ride crypto revolution with</h1>
                <h1 className={textCSS.text3}>experts &amp; friends.</h1>
                <div className={landingPageCSS.text_spacer_responsive_60px}></div>
                <div className={landingPageCSS.download_form}>
                  <Row className="no-gutters">
                    <div className={landingPageCSS.input_mobile_number_container + " " + (this.state.mobile_no_error?landingPageCSS.input_error_border:"")}>
                      <div className={landingPageCSS.input_mobile_number_content}>
                        <Row className="no-gutters">
                          <input placeholder="Enter your Phone Number" value={this.state.mobile_no} onChange={this.inputChangeHandler.bind(this)} onKeyUp={this.inputKeyUpHandler.bind(this)} className={landingPageCSS.input_email_id} name="mobile_no"/>
                        </Row>
                      </div>
                    </div>
                    <div className={landingPageCSS.button_mobile_number} onClick={this.saveMobileNumber.bind(this)}>
                      <p className={textCSS.text6}>Get app link</p>
                    </div>
                  </Row>
                </div>
                <div className={landingPageCSS.filler1}></div>
              </div>
            </Col>
            <Col md={5}>
              <div className={landingPageCSS.carousel_image_container}>
                <img alt="Banner 1" className={landingPageCSS.carousel_image + " " + landingPageCSS.hide_on_mobile_only} src="banner_1_desktop_2.png"/>
                <img alt="Banner 1" className={landingPageCSS.carousel_image + " " + landingPageCSS.show_on_mobile_only} src="banner_1.png"/>
              </div>
            </Col>
          </Row>
          <div className={landingPageCSS.exciting_cards_container}>
            <div className={landingPageCSS.exciting_cards_wrapper + " " + landingPageCSS.show_on_mobile_only}>
              <Row className="no-gutters">
                <Col xs={6}>
                  <div className={landingPageCSS.exciting_card_container}>
                    <div className={landingPageCSS.exciting_card_mobile}>
                      <div className={landingPageCSS.exciting_card_mobile_header}>
                        <img alt="Gifts" className={landingPageCSS.exciting_card_image} src="gifts.png"/>
                        <div className={textCSS.text24}><span className={textCSS.text35}>₹ </span>1 Crores+</div>
                      </div>
                      <div className={textCSS.text25}>worth rewards for beta users</div>
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className={landingPageCSS.exciting_card_container}>
                    <div className={landingPageCSS.exciting_card_mobile}>
                      <div className={landingPageCSS.exciting_card_mobile_header}>
                        <img alt="Rewards" className={landingPageCSS.exciting_card_image} src="rewards.png"/>
                        <div className={textCSS.text24}>First 2000 users</div>
                      </div>
                      <div className={textCSS.text25}>get upto <span className={textCSS.text36}>₹</span>5000 and merchandise</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={landingPageCSS.exciting_cards_wrapper + " " + landingPageCSS.hide_on_mobile_only}>
              <Row className="no-gutters">
                <Col md={6}>
                  <div className={landingPageCSS.exciting_card_container}>
                    <div className={landingPageCSS.exciting_card}>
                      <div className={landingPageCSS.exciting_card_image_container}>
                        <img alt="Gifts" className={landingPageCSS.exciting_card_image} src="gifts.png"/>
                      </div>
                      <div className={landingPageCSS.exciting_card_content}>
                        <div className={textCSS.text24}><span className={textCSS.text35}>₹</span>1 Crores+</div>
                        <div className={textCSS.text25}>worth rewards for beta users</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className={landingPageCSS.exciting_card_container}>
                    <div className={landingPageCSS.exciting_card}>
                      <div className={landingPageCSS.exciting_card_image_container}>
                        <img alt="Rewards" className={landingPageCSS.exciting_card_image} src="rewards.png"/>
                      </div>
                      <div className={landingPageCSS.exciting_card_content}>
                        <div className={textCSS.text24}>First 2000 users</div>
                        <div className={textCSS.text25}>get upto <span className={textCSS.text36}>₹</span>5000 &amp; merchandise</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </section>
      <section className={landingPageCSS.features_section}>
        <div className={absoluteBackgroundsCSS.absolute_background_3}></div>
        <div className={landingPageCSS.features_content}>
          <div className={textCSS.text4}>WHY CRYPSO</div>
          <h1 className={textCSS.text5}>Everything Crypto, Under One Roof</h1>
          <div className={landingPageCSS.features_grid_container}>
            <Row>
              <Col xs={this.state.windowWidth > 576?"6":"7"}>
                <div className={landingPageCSS.features_grid_image_container}>
                  <img alt="Feature 2 Image" className={landingPageCSS.features_grid_image} src="feature_1_mobile.png"/>
                </div>
              </Col>
              <Col xs={this.state.windowWidth > 576?"6":"5"}>
                <div className={landingPageCSS.features_grid_content_container}>
                  <div className={landingPageCSS.features_grid_content}>
                    <p className={textCSS.text38}>Stay Updated</p>
                    <p className={textCSS.text39}>Watch stories and news shorts straight from the Crypto Market</p>
                  </div>
                </div>
              </Col>
              <Col xs={this.state.windowWidth > 576?"6":"5"}>
                <div className={landingPageCSS.features_grid_content_container}>
                  <div className={landingPageCSS.features_grid_content}>
                    <p className={textCSS.text38}>Trade crypto Signals</p>
                    <p className={textCSS.text39}>Make money by trading in crypto through signals created by experts.</p>
                  </div>
                </div>
              </Col>
              <Col xs={this.state.windowWidth > 576?"6":"7"}>
                <div className={landingPageCSS.features_grid_image_container}>
                  <img alt="Feature 1 Image" className={landingPageCSS.features_grid_image} src="feature_2_mobile.png"/>
                </div>
              </Col>
              <Col xs={this.state.windowWidth > 576?"6":"7"}>
                <div className={landingPageCSS.features_grid_image_container}>
                  <img alt="Feature 2 Image" className={landingPageCSS.features_grid_image} src="feature_3_mobile.png"/>
                </div>
              </Col>
              <Col xs={this.state.windowWidth > 576?"6":"5"}>
                <div className={landingPageCSS.features_grid_content_container}>
                  <div className={landingPageCSS.features_grid_content}>
                    <p className={textCSS.text38}>Follow Experts &amp; join friends</p>
                    <p className={textCSS.text39}>Track Expert portfolios, get regular recommendations and insights!</p>
                  </div>
                </div>
              </Col>
              <Col xs={this.state.windowWidth > 576?"6":"5"}>
                <div className={landingPageCSS.features_grid_content_container}>
                  <div className={landingPageCSS.features_grid_content}>
                    <p className={textCSS.text38}>Learn with Crypto communities</p>
                    <p className={textCSS.text39}>Join crypto communities. Follow friends. Explore &amp; Learn. Be a part of the Crypto wave!</p>
                  </div>
                </div>
              </Col>
              <Col xs={this.state.windowWidth > 576?"6":"7"}>
                <div className={landingPageCSS.features_grid_image_container}>
                  <img alt="Feature 3 Image" className={landingPageCSS.features_grid_image} src="feature_4_mobile.png"/>
                </div>
              </Col>
              <Col xs={this.state.windowWidth > 576?"6":"7"}>
                <div className={landingPageCSS.features_grid_image_container}>
                  <img alt="Feature 4 Image" className={landingPageCSS.features_grid_image} src="feature_5_mobile.png"/>
                </div>
              </Col>
              <Col xs={this.state.windowWidth > 576?"6":"5"}>
                <div className={landingPageCSS.features_grid_content_container}>
                  <div className={landingPageCSS.features_grid_content}>
                    <p className={textCSS.text38}>Invest &amp; Grow your Portfolio</p>
                    <p className={textCSS.text39}>Invest in coins. Earn returns!</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <table className={landingPageCSS.features_table}>
            <tbody>
            <tr>
                <td colSpan={2}>
                    <div className={landingPageCSS.features_container}>
                      <p className={textCSS.text38}>Stay Updated</p>
                      <p className={textCSS.text39}>Watch stories and news shorts straight from the Crypto Market</p>
                    </div>
                </td>
                <td className={landingPageCSS.features_image_cell}>
                  <div className={`${landingPageCSS.features_image_container} ${landingPageCSS.border_gradient_to_right}`}>
                    <img alt="Feature 5 Image" className={landingPageCSS.features_image_5} src="feature_1_non_padded.png"/>
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td className={landingPageCSS.features_table_center_column}>
                  <svg className={landingPageCSS.dashed_diagonal_svg}>
                    <line className={landingPageCSS.dashed_diagonal_line} strokeDasharray="10, 10"  x1="100%" y1="0" x2="0" y2="100%"/>
                  </svg>
                </td>
                <td></td>
              </tr>
              <tr>
                <td className={landingPageCSS.features_image_cell}>
                  <div className={`${landingPageCSS.features_image_container} ${landingPageCSS.border_gradient_to_left}`}>
                    <img alt="Feature 1 Image" className={landingPageCSS.features_image_1} src="feature_2_non_padded.png"/>
                  </div>
                </td>
                <td colSpan={2}>
                    <div className={landingPageCSS.features_container}>
                      <p className={textCSS.text38}>Trade crypto Signals</p>
                      <p className={textCSS.text39}>Make money by trading in crypto through signals created by experts.</p>
                    </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td className={landingPageCSS.features_table_center_column}>
                  <svg className={landingPageCSS.dashed_diagonal_svg}>
                    <line className={landingPageCSS.dashed_diagonal_line} strokeDasharray="10, 10"  x1="0" y1="0" x2="100%" y2="100%"/>
                  </svg>
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>
                    <div className={landingPageCSS.features_container}>
                      <p className={textCSS.text38}>Follow Experts &amp; join friends</p>
                      <p className={textCSS.text39}>Track Expert portfolios, get regular recommendations and insights!</p>
                    </div>
                </td>
                <td className={landingPageCSS.features_image_cell}>
                  <div className={`${landingPageCSS.features_image_container} ${landingPageCSS.border_gradient_to_right}`}>
                    <img alt="Feature 2 Image" className={landingPageCSS.features_image_2} src="feature_3_non_padded.png"/>
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td className={landingPageCSS.features_table_center_column}>
                  <svg className={landingPageCSS.dashed_diagonal_svg}>
                    <line className={landingPageCSS.dashed_diagonal_line} strokeDasharray="10, 10"  x1="100%" y1="0" x2="0" y2="100%"/>
                  </svg>
                </td>
                <td></td>
              </tr>
              <tr>
                <td className={landingPageCSS.features_image_cell}>
                  <div className={`${landingPageCSS.features_image_container} ${landingPageCSS.border_gradient_to_left}`}>
                    <img alt="Feature 3 Image" className={landingPageCSS.features_image_3} src="feature_4_non_padded.png"/>
                  </div>
                </td>
                <td colSpan={2}>
                    <div className={landingPageCSS.features_container}>
                      <p className={textCSS.text38}>Learn with Crypto communities</p>
                      <p className={textCSS.text39}>Join crypto communities. Follow friends. Explore &amp; Learn. Be a part of the Crypto wave!</p>
                    </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td className={landingPageCSS.features_table_center_column}>
                  <svg className={landingPageCSS.dashed_diagonal_svg}>
                    <line className={landingPageCSS.dashed_diagonal_line} strokeDasharray="10, 10"  x1="0" y1="0" x2="100%" y2="100%"/>
                  </svg>
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={2}>
                    <div className={landingPageCSS.features_container}>
                      <p className={textCSS.text38}>Invest &amp; Grow your Portfolio</p>
                      <p className={textCSS.text39}>Invest in coins. Earn returns!</p>
                    </div>
                </td>
                <td className={landingPageCSS.features_image_cell}>
                  <div className={`${landingPageCSS.features_image_container} ${landingPageCSS.border_gradient_to_right}`}>
                    <img alt="Feature 4 Image" className={landingPageCSS.features_image_4} src="feature_5_non_padded.png"/>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <div className={landingPageCSS.sectional_desktop_padding_100}></div>
      <div className={landingPageCSS.ad_banner_1_wrapper}>
        <div className={landingPageCSS.ad_banner_1_container}>
          <div className={landingPageCSS.ad_banner_1_content}>
            <p className={textCSS.text26}>Earn Rewards at every Referral</p>
            <div className={landingPageCSS.text_spacer_responsive_12px}></div>
            <p className={textCSS.text27}>#TradeCryptoTogether</p>
          </div>
          <img alt="Rewards Referral" className={landingPageCSS.ad_banner_1_image} src="ad_banner_1_img.png"/>
        </div>
      </div>
      <div className={landingPageCSS.sectional_desktop_padding_100}></div>
      <section className={landingPageCSS.stats_section}>
        <div className={landingPageCSS.stats_content}>
          <p className={textCSS.text7}>JOIN THE REVOLUTION</p>
          <h1 className={textCSS.text8}>The Cryptoverse Is Here. Come Be A Part.</h1>
          <div className={landingPageCSS.stats_card_wrapper}>
            <div className={landingPageCSS.stats_card_container}>
              <div className={landingPageCSS.stats_card_header}>
                <p className={textCSS.text28}>Join the revolution</p>
              </div>
              <Row className="no-gutters">
                <Col xs={4}>
                  <div className={landingPageCSS.stats_card_content}>
                    <img className={landingPageCSS.stats_card_image} src="revolution_image_2.png"/><br/>
                    <p className={textCSS.text40}>50 +</p>
                    <p className={textCSS.text41}>Crypto<br/>Experts</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className={landingPageCSS.stats_card_content}>
                    <img className={landingPageCSS.stats_card_image} src="revolution_image_3.png"/><br/>
                    <p className={textCSS.text40}>200 +</p>
                    <p className={textCSS.text41}>Daily<br/>Signals</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className={landingPageCSS.stats_card_content}>
                    <img className={landingPageCSS.stats_card_image} src="revolution_image_1.png"/><br/>
                    <p className={textCSS.text40}>10,000 +</p>
                    <p className={textCSS.text41}>Crypto<br/>Enthusiasts</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className={landingPageCSS.stats_rows_wrapper + " " + landingPageCSS.hide_on_mobile_only}>
            <div className={landingPageCSS.stats_rows_container}>
              <Row className="no-gutters">
                <Col md={4}>
                  <div className={landingPageCSS.stats_wrapper}>
                    <div className={landingPageCSS.stats_container}>
                      <div className={landingPageCSS.stats_floating_image_container}>
                        <img alt="Revolution Image 2" className={landingPageCSS.stats_floating_image} src="revolution_image_2.png"/>
                      </div>
                      <p className={textCSS.text40}>50+</p>
                      <div className={landingPageCSS.text_spacer_responsive_30px}></div>
                      <p className={textCSS.text41}>Crypto Experts</p>
                      <p className={textCSS.text42}>We bring the best in the community to you</p>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={landingPageCSS.stats_wrapper}>
                    <div className={landingPageCSS.stats_container}>
                      <div className={landingPageCSS.stats_floating_image_container}>
                        <img alt="Revolution Image 3" className={landingPageCSS.stats_floating_image} src="revolution_image_3.png"/>
                      </div>
                      <p className={textCSS.text40}>20+</p>
                      <div className={landingPageCSS.text_spacer_responsive_30px}></div>
                      <p className={textCSS.text41}>Daily Signals Created</p>
                      <p className={textCSS.text42}>High quality signals created by our experts daily for you</p>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={landingPageCSS.stats_wrapper}>
                    <div className={landingPageCSS.stats_container}>
                      <div className={landingPageCSS.stats_floating_image_container}>
                        <img alt="Revolution Image 1" className={landingPageCSS.stats_floating_image} src="revolution_image_1.png"/>
                      </div>
                      <p className={textCSS.text40}>10,000+</p>
                      <div className={landingPageCSS.text_spacer_responsive_30px}></div>
                      <p className={textCSS.text41}>Crypto enthusiasts like you</p>
                      <p className={textCSS.text42}>Unprecedented growth. Our users love us. Give it a try.</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </section>
      <section className={landingPageCSS.trust_section}>
        <div className={landingPageCSS.trust_content}>
          <p className={textCSS.text9}>TRUSTED BY EVERYONE</p>
          <h1 className={textCSS.text10}>Your money will be safe, secure &amp; insured.</h1>
          <div className={landingPageCSS.trust_card_wrapper}>
            <img className={landingPageCSS.trust_shield} src="shield.png"/>
            <div className={landingPageCSS.trust_card_container}>
              <div className={textCSS.text43}>
                Your Money will be safe, secured &amp; insured
              </div>
              <div className={landingPageCSS.trust_card_context}>
                <div className={textCSS.text44}>Privacy</div>
                <div className={landingPageCSS.trust_card_context_image_container}>
                  <img className={landingPageCSS.trust_card_context_image} src="privacy_small.png"/>
                </div>
                <div className={textCSS.text45}>control is in your own hands</div>
              </div>
              <div className={landingPageCSS.trust_card_context}>
                <div className={textCSS.text44}>Security</div>
                <div className={landingPageCSS.trust_card_context_image_container}>
                  <img className={landingPageCSS.trust_card_context_image} src="security_small.png"/>
                </div>
                <div className={textCSS.text45}>Deep encryption &amp; class protection</div>
              </div>
              <div className={landingPageCSS.trust_card_context}>
                <div className={textCSS.text44}>Safety</div>
                <div className={landingPageCSS.trust_card_context_image_container}>
                  <img className={landingPageCSS.trust_card_context_image} src="safety_small.png"/>
                </div>
                <div className={textCSS.text45}>KYC, Fingerprint, PIN &amp; Recovery</div>
              </div>
            </div>
          </div>
          <div className={landingPageCSS.trust_rows_wrapper + " " + landingPageCSS.hide_on_mobile_only}>
            <Row>
              <Col md={4}>
                <div className={landingPageCSS.trust_wrapper}>
                  <div className={landingPageCSS.trust_container}>
                    <img alt="Privacy Image" className={landingPageCSS.trust_image} src="privacy.png"/>
                    <p className={textCSS.text46}>Privacy</p>
                    <p className={textCSS.text47}>You control all your data. We don’t share it with anyone without your consent.</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className={landingPageCSS.trust_wrapper}>
                  <div className={landingPageCSS.trust_container}>
                    <img alt="Security Image" className={landingPageCSS.trust_image} src="security.png"/>
                    <p className={textCSS.text46}>Security</p>
                    <p className={textCSS.text47}>Deep Encryption &amp; world-class security protecting your digital assets</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className={landingPageCSS.trust_wrapper}>
                  <div className={landingPageCSS.trust_container}>
                    <img alt="Safety Image" className={landingPageCSS.trust_image} src="safety.png"/>
                    <p className={textCSS.text46}>Safety</p>
                    <p className={textCSS.text47}>KYC, Fingerprint, PIN &amp; Recovery. All the security options you could ask for</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className={landingPageCSS.investors_section}>
      <div className={absoluteBackgroundsCSS.absolute_background_10}></div>
        <div className={landingPageCSS.investors_content}>
          <p className={textCSS.text11}>INVESTORS</p>
          <h1 className={textCSS.text12}>We are backed by</h1>
          <div className={landingPageCSS.investors_brands_wrapper}>
            <div className={landingPageCSS.investors_brands_container}>
              <Row className="no-gutters">
                <Col xs={6}>
                  <Row className="no-gutters">
                    <Col xs={6}>
                      <div className={landingPageCSS.investor_brand_wrapper}>
                        <div className={landingPageCSS.investor_brand_image_container}>
                          <img alt="Investor Brand 2 Image" className={landingPageCSS.investor_brand_image} id={landingPageCSS.investor_brand_image_2} src="investor_brand_2.png"/>
                        </div>
                        <div className={textCSS.text48}>
                          Hashed Emergent Fund
                        </div>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className={landingPageCSS.investor_brand_wrapper}>
                        <div className={landingPageCSS.investor_brand_image_container}>
                          <img alt="Investor Brand 4 Image" className={landingPageCSS.investor_brand_image} id={landingPageCSS.investor_brand_image_4} src="investor_brand_4.png"/>
                        </div>
                        <div className={textCSS.text48}>
                          Inventus Capital Partner
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xs={6}>
                  <Row className="no-gutters">
                    <Col xs={6}>
                      <div className={landingPageCSS.investor_brand_wrapper}>
                        <div className={landingPageCSS.investor_brand_image_container}>
                          <img alt="Investor Brand 3 Image" className={landingPageCSS.investor_brand_image} id={landingPageCSS.investor_brand_image_3} src="investor_brand_3.png"/>
                        </div>
                        <div className={textCSS.text48}>
                          Better Capital
                        </div>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className={landingPageCSS.investor_brand_wrapper}>
                        <div className={landingPageCSS.investor_brand_image_container}>
                          <img alt="Investor Brand 1 Image" className={landingPageCSS.investor_brand_image} id={landingPageCSS.investor_brand_image_1} src="investor_brand_1.png"/>
                        </div>
                        <div className={textCSS.text48}>
                          Whiteboard Capital
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
          <div className={landingPageCSS.investors_rows_wrapper}>
            <div className={landingPageCSS.investors_rows_container}>
              <div className={landingPageCSS.investor_wrapper}>
                <div className={landingPageCSS.investor_container}>
                  <img alt="Investor 1 Image" className={landingPageCSS.investor_image} src="investor_1.png"/>
                  <p className={textCSS.text49}>Kunal<br/>Shah</p>
                  <div className={textCSS.text50}>Founder</div>
                  <img alt="Investor Company 1" className={landingPageCSS.investor_company_logo} src="investor_company_1.png"/>
                </div>
              </div>
              <div className={landingPageCSS.investor_wrapper}>
                <div className={landingPageCSS.investor_container}>
                  <img alt="Investor 3" className={landingPageCSS.investor_image} src="investor_2.png"/>
                  <p className={textCSS.text49}>Ramakant<br/>Sharma</p>
                  <div className={textCSS.text50}>Founder and CEO</div>
                  <img alt="Investor Company 2" className={landingPageCSS.investor_company_logo} src="investor_company_2.png"/>
                </div>
              </div>
              <div className={landingPageCSS.investor_wrapper}>
                <div className={landingPageCSS.investor_container}>
                  <img alt="Investor 2" className={landingPageCSS.investor_image} src="investor_3.png"/>
                  <p className={textCSS.text49}>Sandeep<br/>Nailwal</p>
                  <div className={textCSS.text50}>Co-Founder</div>
                  <img alt="Investor Company 3" className={landingPageCSS.investor_company_logo} src="investor_company_3.png"/>
                </div>
              </div>
              <div className={landingPageCSS.investor_wrapper}>
                <div className={landingPageCSS.investor_container}>
                  <img alt="Investor 4" className={landingPageCSS.investor_image} src="investor_4.png"/>
                  <p className={textCSS.text49}>Jaynti<br/>Kanani</p>
                  <div className={textCSS.text50}>Co-Founder</div>
                  <img alt="Investor Company 4" className={landingPageCSS.investor_company_logo} src="investor_company_4.png"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={landingPageCSS.sectional_padding_100}></div>
      <footer className={landingPageCSS.footer_section}>
        <div className={landingPageCSS.footer_wrapper}>
      <div className={absoluteBackgroundsCSS.absolute_background_11}></div>
          <div className={landingPageCSS.footer_summary}>
            <div className={landingPageCSS.footer_rows_wrapper}>
              <Row>
                <Col sm={8}>
                  <div className={landingPageCSS.footer_row_wrapper}>
                    <div className={landingPageCSS.footer_container}>
                      <p className={textCSS.text13}>Download our Mobile app </p>
                      <p className={textCSS.text14}>Be a part of crypto revolution. Also, earn Rs. 100 for completing your KYC. So what are you waiting for....</p>
                      <div className={landingPageCSS.text_spacer_responsive_32px}></div>
                      <div className={landingPageCSS.download_form}>
                        <Row className="no-gutters">
                          <div className={landingPageCSS.input_mobile_number_container + " " + (this.state.mobile_no_error?landingPageCSS.input_error_border:"")}>
                            <div className={landingPageCSS.input_mobile_number_content}>
                              <Row className="no-gutters">
                                <input placeholder="Enter your Phone Number" value={this.state.mobile_no} onChange={this.inputChangeHandler.bind(this)} onKeyUp={this.inputKeyUpHandler.bind(this)} className={landingPageCSS.input_email_id_footer} name="mobile_no"/>
                              </Row>
                            </div>
                          </div>
                          <div className={landingPageCSS.button_mobile_number} onClick={this.saveMobileNumber.bind(this)}>
                            <p className={textCSS.text6}>Get app link</p>
                          </div>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className={landingPageCSS.footer_preview_image_wrapper}>
                    <div className={landingPageCSS.footer_preview_image_container}>
                      <img alt="Crypso Mobile Image" className={landingPageCSS.footer_preview_image + " " + landingPageCSS.hide_on_mobile_only} src="crypso_mobile.png"/>
                      <img alt="Crypso Mobile Image" className={landingPageCSS.footer_preview_image + " " + landingPageCSS.show_on_mobile_only} src="crypso_mobile_mobile.png"/>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className={landingPageCSS.footer_links_wrapper}>
            <Row className="no-gutters">
              <Col md={4} className={landingPageCSS.misc_links_wrapper}>
                <div className={landingPageCSS.misc_links_container + " " + landingPageCSS.hide_on_mobile_only}>
                  <Row className="no-gutters">
                    <Col sm={6}>
                      <a target="_blank" rel="noreferrer" href="https://www.notion.so/crypso/ABOUT-US-4e6d62fc1ad345428b7719955ce92fc5"><div className={textCSS.text51}>About Us</div></a>
                      <a target="_blank" rel="noreferrer" href="https://www.notion.so/crypso/CONTACT-US-9e5facfe63aa4e0f89c36afd7430eb12"><div className={textCSS.text51}>Contact Us</div></a>
                    </Col>
                    <Col sm={6}>
                      <a target="_blank" rel="noreferrer" href="/terms_and_conditions"><div className={textCSS.text51}>Terms of Use</div></a>
                      <a target="_blank" rel="noreferrer" href="/privacy_policy"><div className={textCSS.text51}>Privacy Policy</div></a>
                    </Col>
                  </Row>
                </div>
                <div className={landingPageCSS.misc_links_container + " " + landingPageCSS.show_on_mobile_only}>
                  <Row className="no-gutters">
                    <Col xs={3}>
                      <a target="_blank" rel="noreferrer" href="https://www.notion.so/crypso/ABOUT-US-4e6d62fc1ad345428b7719955ce92fc5"><div className={textCSS.text51}>About Us</div></a>
                    </Col>
                    <Col xs={3}>
                     <a target="_blank" rel="noreferrer" href="https://www.notion.so/crypso/CONTACT-US-9e5facfe63aa4e0f89c36afd7430eb12"><div className={textCSS.text51}>Contact Us</div></a>
                    </Col>
                    <Col xs={3}>
                     <a target="_blank" rel="noreferrer" href="/privacy_policy"><div className={textCSS.text51}>Privacy Policy</div></a>
                    </Col>
                    <Col xs={3}>
                      <a target="_blank" rel="noreferrer" href="/terms_and_conditions"><div className={textCSS.text51}>Terms of Use</div></a>
                    </Col>
                  </Row>
                      {/* <a target="_blank" rel="noreferrer" href="https://www.notion.so/crypso/ABOUT-US-4e6d62fc1ad345428b7719955ce92fc5"><div className={textCSS.text51}>About Us</div></a>
                     <a target="_blank" rel="noreferrer" href="https://www.notion.so/crypso/CONTACT-US-9e5facfe63aa4e0f89c36afd7430eb12"><div className={textCSS.text51}>Contact Us</div></a>
                     <a target="_blank" rel="noreferrer" href="https://www.notion.so/crypso/Terms-and-Condition-Privacy-Policy-Together-Innovation-Labs-Pvt-Ltd-3003b76f76184db2ba9badd8af0fd46f#de43cd4587064601b5808de21179c5a9"><div className={textCSS.text51}>Privacy Policy</div></a>
                      <a target="_blank" rel="noreferrer" href="https://www.notion.so/crypso/Terms-and-Condition-Privacy-Policy-Together-Innovation-Labs-Pvt-Ltd-3003b76f76184db2ba9badd8af0fd46f#69b81071c04b4b5ebd59986924fb327f"><div className={textCSS.text51}>Terms of Use</div></a> */}
                </div>
              </Col>
              <Col md={8}>
                <div className={landingPageCSS.social_links_container}>
                <p className={textCSS.text15}>Copyright &copy; 2022 | Crypso</p>
                <a target="_blank" rel="noreferrer" href="https://twitter.com/crypsoHQ"><img alt="Social Twitter Image" className={landingPageCSS.footer_link_images} src="social_twitter.png"/></a>
                <a target="_blank" rel="noreferrer" href="https://in.linkedin.com/company/crypso"><img alt="Social Linkedin Image" className={landingPageCSS.footer_link_images} src="social_linkedin.png"/></a>
                <a target="_blank" rel="noreferrer" href="https://discord.gg/s2MzH82PsN"><img alt="Social Discord Image" className={landingPageCSS.footer_link_images} src="social_discord.png"/></a>
                <a target="_blank" rel="noreferrer" href="https://t.me/CrypsoChat"><img alt="Social Telegram Image" className={landingPageCSS.footer_link_images} src="social_telegram.png"/></a>
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/crypso_club/"><img alt="Social Instagram Image" className={landingPageCSS.footer_link_images} src="social_instagram.png"/></a>
              </div>
              </Col>
            </Row>
          </div>
        </div>
      </footer>
    </div>)
  }
  fireMessage(title, message, type){
    var typeData = {
      warning: ["#6D1FE6", "#251144"], 
      error:["#6D1FE6", "#251144"], 
      success:["#6D1FE6", "#251144"], 
      info:["#6D1FE6", "#251144"], 
      question:["#6D1FE6", "#251144"]
    }
    Swal.fire({
      title: title,
      text: message,
      icon: type,
      iconColor: typeData[type][0],
      color: typeData[type][1]
    })
  }
}
export default Home