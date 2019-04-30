<template>
  <div class="app-container" v-loading='loading'>
    <div class="buyStepIndex">
      <buy-steps  ></buy-steps>
      <div title="确认订单">
        <div class="payList clearfix">
          <!-- <h3 class="tit">订购机构:{{OrgName}}</h3> -->
          <div class="list">
            <ul>
              <li>服务名称</li>
              <li>服务时长</li>
              <li>购买数量</li>
              <li>服务价格(元)</li>
            </ul>
            <ul>
              <li>{{serveName}}</li>
              <li>{{12*amount}}个月</li>
              <li>{{amount}}年</li>
              <li>{{price}}</li>
            </ul>
          </div>
        </div>
        <div class="payment clearfix">
          <p class="price">应付款:<span>{{price*amount}}</span></p>
          <p class="ljzf" @click="jumpToPay" to=""> 立即支付</p>
          <div class="xy">
            <el-checkbox v-model="checked">阅读并同意</el-checkbox>
            <a class="text" href="javascript:void(0);" @click="jump">《血透管理协议》</a>
          </div>
        </div>
      </div>


    </div>
    <el-dialog
      title="圣卫士·酷医云服务协议"
      :visible.sync="centerDialogVisible"
      width="700px"
      center>
      <p class="xy-title">一、服务协议定义</p>
      <p>1、圣卫士酷医云（本协议中指包括但不限于 kuyicloud.com 、 sgjyun.com 等网站和相关应用，以下简称“酷医云”）是肾病服务机构数字化运营管理云平台，由深圳市健康互动科技有限公司（以下简称“健康互动公司”）所有和运作。</p>
      <p>2、本协议是酷医云用户(包括个人、企业及其他组织，以下简称“甲方”)与酷医云运营企业健康互动公司（以下简称“乙方”）之间的法律契约。用户访问、浏览和注册酷医云即代表接受本协议条款的约束，用户对酷医云的访问和使用应以接受并遵守本协议所载明的条款和条件为前提。</p>
      <p class="xy-title">二、声明与承诺</p>
      <p>1、您确认，在您申请开通酷医云之前，您已充分阅读、理解并接受本协议的全部内容。</p>
      <p>2、您同意，酷医云有权随时对本协议内容进行单方面的变更，并以在酷医云网站公告的方式予以公布，无需另行单独通知您；若您在本协议内容公告变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的协议内容使用本服务；若您不同意修改后的协议内容，您应立即停止使用本服务。</p>
      <p>3、您声明，在您同意接受本协议并注册开通酷医云时，您是具有法律规定的完全民事权利能力和民事行为能力，能够独立承担民事责任的自然人、法人或其他组织；本协议内容不受您所属国家或地区的排斥。不具备前述条件的，您应立即终止注册或停止使用本服务。</p>
      <p class="xy-title">三、知识产权声明</p>
      <p>1、酷医云包括但不限于应用程序、源代码、商标、标示图案(LOGO)、界面设计、应用程序编程接口(API)等所关联的所有知识产权均属健康互动公司所有。用户不得复制、修改、传播或在非酷医云所属的服务器上做镜像或者以其它方式进行非法使用。</p>
      <p>2、用户在酷医云平台所创建的独创性数据归属该用户所有，该用户有权对前述数据进行任何形式的处置，包括从平台中复制，导出和删除。</p>
      <p>3、用户应当确保其公开或存储（方式包括但不限于：上传、保存、公布、发布等）于本网站及相关服务器的内容不存在任何侵犯其他第三方知识产权的情形。若存在本条所述情形，健康互动公司有权根据具体情节针对上述内容，采取包括但不限于限制、屏蔽、删除、修改等手段，由此给酷医云用户造成的损失由酷医云用户自行承担；若健康互动公司因酷医云用户存在本条所述行为而向其他第三方承担法律责任的，健康互动公司有权向网站用户追偿全部损失。</p>
      <p class="xy-title">四、软件订购服务费用</p>
      <p>酷医云产品包括多个子应用，基础应用SCRM、微商城免费使用，需要付费购买的应用，按以下协议执行。</p>
      <p>1、甲方使用酷医云前，应事先注册开通酷医云账号，并向乙方支付软件服务费，且不同的软件功能组合服务费不同。产品服务费价格及服务时间会根据市场情况发生变更，具体以酷医云平台订购时页面展示为准。</p>
      <p>2、甲方可通过在线支付-微信扫码支付方式支付软件服务费，或通过转账的方式向乙方支付软件服务费。</p>
      <p class="xy-title-s">乙方账户信息（支付时备注在酷医云注册时的机构名称+酷医云服务费）：</p>
      <p class="xy-title-s">名 称：深圳市健康互动科技有限公司</p>
      <p class="xy-title-s">开户行：招商银行股份有限公司深圳高新园支行</p>
      <p class="xy-title-s">账  号：755926838810901</p>
      <p>3、甲方同意本协议并按本协议约定支付软件服务费以后，酷医云服务即订购成功。一旦订购成功，甲方即可开始使用酷医云产品。</p>
      <p>4、甲方同意一旦甲方订购本服务支付软件服务费，酷医云不因本协议的中止、终止或甲方单方面而退出将已支付的软件服务费退还给甲方。</p>
      <p>5、本协议服务期根据甲方支付软件服务费时所选择的服务期决定，但不论甲方订购一年还是两年，只要是首次订购且不论是否在体验期内订购本服务，服务期均从甲方订购成功之日起开始计算。</p>
      <p>6、甲方应于服务期到期前续费，如甲方到期未续费的，甲方将于服务期到期日停止使用本服务。如甲方在到期前或到期当天续费的，新的服务期从原服务期到期的次日开始计算；若甲方在原服务期到期之后续费的，新的服务期于甲方续费完成之日起开始计算。</p>
      <p>7、如甲方需要，乙方将开具项目为“＊信息技术服务＊软件服务费”的增值税普通发票。但甲方应向乙方提供如下信息：开票名称、纳税人识别号。若需增值税专用发票的，甲方应事先和乙方说明，且除上述增值税普通发票需提供的信息外，还须提供地址、电话、开户行和账号。</p>

      <p class="xy-title">五、甲乙双方权利和义务</p>
      <p class="xy-title-s">甲方权利及义务</p>
      <p>1、甲方是酷医云的最终用户，其保证向乙方提交的注册信息均真实、准确、及时、详尽和完整，并不断更新注册资料，以符合及时、详尽和准确的要求；甲方注册信息不含有任何违反法律、法规及规范性文件，或侵犯他人合法权益的内容。</p>
      <p>2、甲方承诺通过酷医云所从事的一切活动都是合法、真实的，不侵犯他人的合法权益，其对通过酷医云进行的活动所引发的一切法律后果承担全部责任。如因甲方使用酷医云的行为导致乙方或第三方损失的，则甲方需赔偿乙方及（或）第三方的全部直接及间接损失（以乙方间接损失或甲方获得的利益为准，含合理的律师费用）。</p>
      <p>3、如甲方非正常使用酷医云（包括但不限于使用酷医云从事违法、违规活动），乙方有权采取发出警告、暂时中止、永久终止用户身份，并不退回甲方已支付但未使用的费用，并保留对甲方追究相关法律责任的权利，并有权要求甲方赔偿乙方直接损失和间接损失（以乙方间接损失或甲方获得的利益为准，含合理的律师费用）。</p>
      <p>4、甲方必须通过乙方指定的系统登录并使用酷医云，对于通过其他手段登录、使用所造成的后果，乙方将不承担任何责任。</p>
      <p>5、甲方应按时足额向乙方支付费用，否则乙方有权随时终止甲方使用酷医云，且对因终止协议而可能造成的损害不承担任何责任。</p>
      <p>6、甲方同意在酷医云使用许可期间，遵守本协议条款和乙方不时发布或修订的有关酷医云的各项规则、通告。如因甲方违反了前述约定，则乙方有权单方终止甲方使用酷医云的权利，而无需事先通知甲方并不退还已收取的任何费用。</p>
      <p>7、如甲方不能正常使用酷医云或因使用而致损，除本协议约定的免责情形外，则甲方同意所获赔偿的最高限额应不超过甲方在对应的授权使用期间内已支付给乙方的费用。</p>
      <p>8、甲方同意，由于技术环境的局限性及其发展，其所购酷医云将存有缺陷和不稳定性，并同意乙方有权不经过甲方同意而更新升级；甲方同意绝不因乙方酷医云因技术环境的局限存在的缺陷和不稳定性追究乙方责任。</p>
      <p>9、甲方同意，乙方无须对酷医云的功能适用于甲方，且没有技术瑕疵承担保证责任。</p>
      <p>10、本协议签订后，甲方不得无故要求解除本协议或无故要求乙方退还已收取的费用，如甲方违反前述规定，视为甲方违约，乙方有权单方解除本协议，并不予退还已经收取的全部款项，还有权要求甲方按照协议金额的双倍支付违约金。</p>
      <p>11、如果甲方非正常使用，或者通过技术手段（包括但不限于利用第三方或自有工具，自动记录、未经授权违规获取数据的行为）爬取酷医云的数据或未经授权转让和销售从酷医云获取的数据，或者甲方的行为可能会使酷医云或酷医云服务的第三者产生法律责任，酷医云有权发出警告，暂时中止、永久终止用户身份，并保留对甲方追究相关法律责任的权利，并有权要求甲方赔偿乙方直接损失和间接损失（以乙方间接损失或甲方获得的利益为准，含合理的律师费用）。</p>
      <p>12、甲方不得修改、改编、翻译酷医云相关产品和服务，或创作酷医云相关产品和服务的派生作品，或通过反编译、反向工程、反汇编或其它方式从酷医云相关产品和服务中得到源代码，甲方不得将酷医云相关产品和服务进行复制、拷贝、出售、转售或任何用于其他商业目的。若甲方存在上述情形，则乙方有权单方解除本协议，并要求甲方赔偿乙方全部的直接损失与间接损失（以乙方间接损失或甲方获得的利益为准，含合理的律师费用）。</p>
      <p class="xy-title-s">乙方的权利义务</p>
      <p>1、乙方是酷医云的权利人，承诺按本协议的约定许可甲方使用酷医云。</p>
      <p>2、乙方应在其网络系统内建立合理的安全体系，包括身份识别体系、内部安全防范体系，以使甲方数据尽可能完整，并且保密。但甲方了解并同意，乙方无法杜绝全部的非安全因素，但乙方会及时更新体系，妥善维护网络及相关数据。</p>
      <p>3、乙方将采取保密措施存储甲方信息，非经甲方书面同意，不得向任何第三方泄漏。以下信息除外：1）非由于乙方的原因已经为公众所知的；2）由于乙方以外其他渠道被他人获知的信息，这些渠道并不受保密义务的限制；3）由于法律的使用，法院或其他国家有权机关的要求而披露的信息。</p>
      <p>4、 乙方保留使用汇总统计性信息的权利，在不透露单个用户隐私资料的前提下，乙方有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
      <p>5、除非另行声明，酷医云内的所有产品、技术、软件、程序、数据及其他信息（包括但不限于文字、图像、图片、照片、音频、视频、图表、色彩、版面设计、电子文档）的所有权利（包括但不限于版权、商标权、专利权、商业秘密及其他所有相关权利），均归乙方或其关联公司所有。未经乙方许可，任何人不得擅自使用（包括但不限于通过任何设备传播、展示、出售、镜像、上载、下载）酷医云内的任何内容。若甲方违反上述规定，乙方有权单方解除本协议，并要求甲方赔偿乙方全部的直接损失与间接损失。</p>
      <p>6、由于以下原因引起的系统错误或损坏，乙方无须承担任何责任：1）因甲方自身过错或过失而导致甲方用户登录名或密码泄漏所造成的损害或损失；2）由火灾、盗窃、黑客攻击和（或）其他不可抗力因素所造成的损害或损失；3）乙方许可范围之外所引起的甲方直接或间接的损害或损失。</p>
      <p>7、如出现下列情况之一的，乙方有权单方终止本协议，且乙方无需向甲方退还其未履行部分的协议价款：1）甲方逾期10个工作日未向乙方支付到期款项的；2）未经乙方书面同意，甲方许可他人使用酷医云或转让酷医云使用许可的；3）甲方被认定为违法违规对外贸易经营者的；4）甲方违反本协议其他规定，且自乙方通知其纠正后仍未纠正的。</p>
      <p class="xy-title">六、免责声明</p>
      <p>1、酷医云将尽最大努力保障软件平台的连续可靠运行，但鉴于网络服务的特殊性，酷医云对可能发生的网络服务的中断或终止所可能导致的一切损失，不承担任何法律责任及经济赔偿。</p>
      <p>2、酷医云将尽最大努力保障客户数据的安全备份，但无法承诺100%的数据恢复，对因数据丢失带来的任何直接或间接损失不承担任何责任。</p>
      <p>3、在发生需要从备份文件中恢复数据的情形时，酷医云通常需要8小时，最长48小时完成，在此时间范围内的数据恢复视作服务是连续的。</p>
      <p>4、 对于因不可抗力或酷医云不能控制的原因造成的网络服务中断和长时间终止，本网站不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p>
      <p>5、酷医云将尽可能采取一切措施保护用户数据及个人信息资料安全。但用户通过使用或安装第三方应用打开酷医云中的文件，该文件会在第三方应用中打开，由于第三方应用而造成的损失，本网站不承担任何法律责任及经济赔偿。</p>
      <p class="xy-title">七、协议变更</p>
      <p>1、酷医云有权随时对本协议的条款进行修订，一旦本协议的内容发生变更，酷医云将会在修订生效日前一个工作日更新。</p>
      <p>2、如用户继续使用酷医云服务，则视为用户接受酷医云对协议相关条款所做的修订。</p>
      <p class="xy-title">八、其他</p>
      <p>1、甲乙双方因协议书的解释或履行产生争议，双方应本着互谅互让的原则协商解决，协商不成可向乙方注册地的人民法院提请诉讼。</p>
      <p>2、本协议最终解释权及修订权归酷医云所有</p>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="centerDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
  import BuySteps from './components/buySteps'
  import {getProduct, postOrderInfo} from "@/api/service"

  export default {
    name: "servicePay",
    data() {
      return {
        loading:true,
        centerDialogVisible:false,
        checked: false,
        OrgName: '',
        serveName: '',
        price: '',
        amount: '',
        id: '',
        
        products: [

        ],
        productsMap:{},
        selectProduct:{},
      };
    },
    components: {
      BuySteps
    },
    created() {
      this.id = this.$route.query.serve_id;
      this.getProduct()

    },
    mounted() {
      this.amount = this.$route.query.amount

    },
    methods: {
      getProduct: function () {
        getProduct().then(response => {
          if(response.data.state==0) {
            this.$message.error(response.data.msg);
          }else {
            this.subscibe = response.data.data.subscibe
            for (let i = 0; i < response.data.data.products.length; i++) {
              this.products.unshift(response.data.data.products[i]);
              this.productsMap[response.data.data.products[i]['id']] = response.data.data.products[i];
            }

            if(!(this.id in this.productsMap)) {
              this.$message.error("没有此服务，无法订购");
              return false;
            }

            
            // this.serveName = response.data.data.products[0].serve_name
            // this.price = response.data.data.products[0].price
            // this.id = response.data.data.products[0].id
            this.serveName = this.productsMap[this.id].serve_name
            this.price = this.productsMap[this.id].price

            this.OrgName = response.data.data.OrgName
          }
          this.loading = false;
        })
      },
      jumpToPay: function () {
        if (this.checked) {
          let params = {
            'amount': this.amount,
            'id': this.id
          }
          postOrderInfo(params).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.$notify({
                title: "成功",
                message: response.data.data.msg,
                type: "success",
                duration: 2000
              });

              let orderId = response.data.data.order.id
              this.$router.push("/payType?id=" + orderId);
            }
          })

        } else {
          this.$message.error("请阅读并同意血透管理协议");
        }
      }, jump: function () {
        this.centerDialogVisible = true;
        // window.open("http://www.baidu.com")  // sso 地址

      }
    },


  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    padding: 20px;
    background: #f6f8f9;
    min-height: calc(100vh - 84px);
    overflow: hidden;
    .xy-title{
      font-size: 18px;
      font-weight: 600;
    }
    .xy-title-s{
      font-size: 14px;
      font-weight: 600;
    }
    .buyStepIndex {
      background: #fff;
      color: #353535;
      padding: 10px 30px;
      font-size: 14px;
      .buy-steps {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        border-bottom: 1px solid #eee;
        .buy-steps_item {
          color: #888888;
        }
        .buy-steps_item-in {
          color: #353535;
        }
        .buy-steps_line {
          margin: 0 20px;
        }
      }
      .payList {
        .tit {
          color: #999;
          font-size: 12px;
          font-weight: normal;
        }
        .list {
          ul {
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -o-box-sizing: border-box;
            -ms-box-sizing: border-box;
            box-sizing: border-box;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            justify-content: space-between;
            -webkit-box-pack: space-between;
            text-align: center;
            line-height: 40px;
            padding: 0 10px;
            &:first-child {
              background: #f6f8fa;
              font-weight: 700;
              color: #3a3a3a;
            }
            li {
              flex: 1;
              // color: #9f9b97;
              &:first-child {
                text-align: left;
              }
              &:last-child {
                text-align: right;
              }
            }
          }
        }
      }
      .payment {
        background: #f6f8fa;
        text-align: right;
        border-top: 1px solid #eee;
        width: 100%;
        .price {
          color: #484139;
          font-size: 12px;
          span {
            color: #ff5050;
            font-size: 16px;
            font-weight: 700;
            font-family: "Arial";
          }
        }
        .ljzf {
          width: 86px;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          color: #ffffff;
          border: none;
          border-radius: 2px;
          text-align: center;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          background: #fb6161;
          display: inline-block;
          margin: 0 0 10px 0;
        }
        .xy {
          background: #fff;
          padding-top: 10px;
          a {
            color: #409eff;
          }
        }
      }
      // .stepTwo {
      //   padding-top: 30px;
      //   position: relative;
      //   .prompt-part {
      //     line-height: 20px;
      //     font-size: 14px;
      //     .prompt_1 {
      //       height: 20px;
      //       color: #353535;
      //     }
      //     .prompt_2 {
      //       height: 20px;
      //       color: #888888;
      //       margin-top: 10px;
      //     }
      //   }
      //   .pay-price {
      //     position: absolute;
      //     top: 41px;
      //     right: 0;
      //     height: 28px;
      //     line-height: 28px;
      //     color: #353535;
      //     span {
      //       font-size: 20px;
      //       color: #fb6161;
      //     }
      //   }
      //   .option-list {
      //     margin-top: 30px;
      //     width: 100%;
      //     height: auto;
      //     .option-item {
      //       width: 100%;
      //     //   height: 90px;
      //       line-height: 90px;
      //       font-size: 16px;
      //       color: #353535;
      //       border-bottom: 1px solid #eeeeee;
      //       cursor: pointer;
      //       &.active {
      //         box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.07);
      //       }
      //       .radio-input {
      //         width: 14px;
      //         height: 14px;
      //         margin: 38px 20px 0 30px;
      //         border-radius: 7px;
      //         border: 1px solid #b2b2b2;
      //         float: left;
      //         &.active-radio {
      //           color: #2a75ed;
      //           position: relative;
      //           &:after {
      //             position: absolute;
      //             top: 1px;
      //             left: 1px;
      //             width: 10px;
      //             height: 10px;
      //             content: "";
      //             border-radius: 5px;
      //             background: #2a75ed;
      //           }
      //         }
      //       }
      //       .pay-way-icon {
      //         width: 24px;
      //         height: 24px;
      //         display: inline-block;
      //         margin: 33px 10px 0 0;
      //         float: left;
      //         img {
      //           width: 100%;
      //           height: 100%;
      //           float: left;
      //         }
      //       }
      //       .del{
      //           padding-left: 60px;
      //           p{
      //               padding: 0;
      //               margin: 0;
      //               font-size: 13px;
      //               line-height: 26px;

      //           }
      //       }
      //     }
      //   }
      //   .footer-btn {
      //     text-align: center;
      //     margin-top: 50px;
      //     .btnBlue {
      //       display: inline-block;
      //       width: 90px;
      //       height: 36px;
      //       padding: 0;
      //       text-align: center;
      //       line-height: 36px;
      //       border-radius: 2px;
      //       cursor: pointer;
      //       font-size: 14px;
      //       color: #fff;
      //       background: #409eff;
      //       border: none;
      //     }
      //   }
      // }
    }
  }
</style>

