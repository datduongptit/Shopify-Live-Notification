let productID = "";
let isProductPage = 0;
let page = __st.p;
// shop
const shop = Shopify.shop;
let timeLoad, effect_display, TimeDisplay, effect_hidden, productCount, ip;
let productIndex = 0;
let showDevice = "";
let screenWidth = screen.width;
let browsers = window.navigator.userAgent;
let count_people = 0;
const product_id = __st.rid;
let date = Date.now();
console.log(__st);
let myPromise = new Promise((resolve, reject) => {
  $.getJSON("https://api.ipify.org?format=json", function (data) {
    if (data) {
      resolve(data);
    } else {
      reject(new Error("Error"));
    }
  });
});

const dataUser = { ip, date, browsers, shop, product_id };
// get setting
$.get(`${rootlinkLiveSale}/api/notification_view/${shop}`, async function (
  data
) {
  let setting = data[0];
  try {
    // get styles
    const getStyle = (setting) => {
      html = "<style>";
      if (setting.style == 1) {
        html += ".ot-view-sales{top: 0;}";
      } else if (setting.style == 2) {
        html += ".ot-view-sales{bottom: 0;}";
      } else if (setting.style == 3) {
        html += ".ot-view-sales{yop: 0; top: 0;}";
      } else if (setting.style == 4) {
        html += ".ot-view-sales{right: 0;}";
      }
      html += `'.layout_2{background:${setting.bg_popup} ;color:${setting.colorText};}
            .layout{display:none;}
            .layout_1{background: linear-gradient(-90deg, ${setting.bg_left}, ${setting.bg_right});}
            </style>
            <script>
                jQuery(function($){
                    var show_view = setTimeout(function () {
                        $(".layout").fadeIn(2000);
                    }, 1000);
                    var hide_view = setTimeout(function () {
                        $(".layout").fadeOut(1000);
                }, 6000);
                });
            </script>
  `;
      console.log(html);
      return html;
    };
    // get theme
    const getTheme = (setting, count_people) => {
      let layout, content;
      if (setting.layOut == 1 || setting.layOut == 2) {
        layout = 1;
      } else {
        layout = 2;
      }
      if (setting.layOut == 1 || setting.layOut == 4) {
        content = 1;
      } else {
        content = 2;
      }
      if (setting.type == 1) {
        setting.text_display = setting.text_display.replace(
          "{{count_people}}",
          count_people
        );
      } else {
        count_people = Math.floor(
          Math.random() * (setting.max - setting.min + 1) + setting.min
        );
        setting.text_display = setting.text_display.replace(
          "{{count_people}}",
          count_people
        );
      }
      if (content == 2) {
        html += `<div class="layout layout_${layout}">
                <i class="fa fa-users"></i>
                <span>${setting.text_display}</span>
            </div>
    `;
      } else {
        html += `<div class="layout layout_${layout}">
                <i class="fa fa-eye"></i>
                <span>${setting.text_display}</span>
            </div>
    `;
      }
      return html;
    };

    // check expired
    const checkExpired = async () => {
      $.get(`${rootlinkLiveSale}/api/getUtilities/${shop}`, (data) => {
        console.log(data);
        let trial_days = 100000;
        let shop_data = data[0];
        let installedDate = shop_data.installed_date;
        // let confirmationUrl = shop_data.confirmation_url;
        let clientStatus = shop_data.status;
        let date1 = new Date(installedDate);
        let date2 = new Date();
        let interval = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
        if (interval > trial_days && clientStatus != "active") {
          return true;
        } else {
          return false;
        }
      });
    };
    console.log("test", checkExpired());

    // get live order
    const getLiveOrder = () => {
      let status = JSON.parse(setting.status);
      let count = setting.count;
      let orders = [];
      if (count == 0) {
        return order;
      }
      let result_order = [];
      $.get(`${rootlinkLiveSale}/api/tbl_usersettings/${shop}`, (data) => {
        const access_token = data[0].access_token;
        $.ajax({
          method: "GET",
          headers: {
            "X-Shopify-Access-Token": access_token,
            "Content-Type": "application/json",
          },
          url: `https://${shop}admin/api/2020-10/limit=${count}&financial_status=${status}`,
          dataType: "json",
          success: (data) => {
            result_order.push(data["orders"]);
            if (Array.isArray(result_order)) orders.push(result_order);
            let key = 0;
            let lists = [];
            orders.forEach((order) => {
              lists[key] = order;
              lists[key].isFake = 0;
              key++;
            });
            return lists;
          },
        });
      });
    };

    if (setting.status == 1) {
      html = getStyle(setting);
      let res = await myPromise;
      dataUser.ip = res.ip;
      $.get(
        `${rootlinkLiveSale}/api/notification_count/${shop}`,
        { ip: ip, product_id: product_id },
        (data) => {
          if (data.length > 0) {
            dataUser.date = Date.now();
            $.ajax({
              type: "PUT",
              url: `${rootlinkLiveSale}/api/notification_count/${shop}/${product_id}`,
              data: dataUser,
            });
          } else {
            $.post(`${rootlinkLiveSale}/api/notification_count`, dataUser);
          }
          let tg = Date.now();
          let tgout = 300;
          let tgnew = tg - tgout;
          $.ajax({
            type: "DELETE",
            url: `${rootlinkLiveSale}/api/notification_count/${product_id}/${tgnew}`,
          });
        }
      );
      html += getTheme(setting, count_people);
    } else {
      html = "";
    }

    if (typeof Shopify.designMode === "undefined") {
      if (typeof window.otLiveCheckExistFile === "undefined") {
        otLiveSaleInit();
        window.otLiveCheckExistFile = false;
      }
    } else {
      console.log(
        "The Sales Pop Live Notifications App doesn't support in the Design Mode"
      );
    }

    async function otLiveSaleInit() {
      let data4 = {};
      data4.shop = shop;
      data4.action = "getShowDevice";
      data4.productId = productID;
      $.get(`${rootlinkLiveSale}/api/notification_view/${shop}`, function (
        data
      ) {
        showDevice = data[0].show_device;
        if (showDevice === "desktop" && screenWidth > 768) {
          $("body").append("<div class='ot-live-sales'></div>");
        } else if (showDevice === "mobile" && screenWidth < 768) {
          $("body").append("<div class='ot-live-sales'></div>");
        } else if (showDevice === "all") {
          $("body").append("<div class='ot-live-sales'></div>");
        }
        if (page === "product") {
          productID = __st.rid;
          if (showDevice === "desktop" && screenWidth > 768) {
            $("body").append("<div class='ot-view-sales'></div>");
          } else if (showDevice === "mobile" && screenWidth < 768) {
            $("body").append("<div class='ot-view-sales'></div>");
          } else if (showDevice === "all") {
            $("body").append("<div class='ot-view-sales'></div>");
          }
          $("head").append(
            "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'>"
          );
          var data1 = {};
          data1.shop = shop;
          data1.action = "getViewSale";
          data1.productId = productID;
          $("head").append(
            `<link rel='stylesheet' type='text/css' href='${rootlinkLiveSale}/ViewSale.css?v=5' />`
          );
          if (typeof html === "string") {
            html = JSON.parse(html);
          }
          $(".ot-view-sales").append(`${html}`);
        }
      });
      // checkExpired();
      // console.log(checkExpired());
      // const {
      //   TimeLoop,
      //   effect_display,
      //   TimeDisplay,
      //   show_notifications,
      // } = setting;
      // if (!expired) {
      //   let response = {};
      // }
    }
  } catch (err) {
    console.error(err);
  }
});
