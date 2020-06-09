<template>
  <a-layout id="components-layout-demo-top-side" style="padding-top: 25px;padding-bottom: 25px">
    <a-layout-content style="padding: 0 50px">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            v-model="current"
            mode="inline"
            style="height: 100%"
          >
            <a-menu-item key="we"><a-icon type="user" />
              关于我们
            </a-menu-item>
            <a-menu-item key="help"><a-icon type="laptop" />
              帮助中心
            </a-menu-item>
            <a-menu-item key="serve"><a-icon type="notification" />
              服务协议
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <h1 v-if="this.current[0]==='we'" :style="{fontWeight:'800'}">关于我们</h1>
          <h1 v-if="this.current[0]==='help'" :style="{fontWeight:'800'}">帮助中心</h1>
          <h1 v-if="this.current[0]==='serve'" :style="{fontWeight:'800'}">服务协议</h1>
          <a-divider />
          <div v-if="this.current[0]==='serve'">
            <h3>尊敬的用户，您好！</h3>
            <h3>欢迎使用本网站，在您使用本网站前，请您认真阅读并遵守《服务协议》（以下简称”本协议”），请您务必审慎阅读、充分理解协议的各条款内容。<br>
              当您在注册过程中点击查看”看过并同意本服务协议”，按照注册流程成功注册为网站的用户即表示您已充分阅读、理解并完全接受本协议中的全部条款。您承诺接受并遵守本协议的约定，届时您不应以未阅读本协议的内容等理由，主张本协议无效或本协议中的某些条款无效，或要求撤销本协议。
            </h3>
            <h3 :style="{fontWeight:'800'}">本网站权利和义务</h3>
            <h3 :style="{paddingLeft:'20px'}">1.尊重用户隐私：尊重用户隐私，保障用户隐私安全是网站的一项基本政策；</h3>
            <h3 :style="{paddingLeft:'20px'}">2.管理网站用户：网站依据国家法律、地方法律和国际法律等的标准以及本行业的规则来管理网站注册用户；</h3>
            <h3 :style="{paddingLeft:'20px'}">3.处理用户反馈：网站的相关人员会及时处理用户反馈的问题并给予及时回复。</h3>
            <h3 :style="{fontWeight:'800'}">用户权利和义务</h3>
            <h3 :style="{paddingLeft:'20px'}">用户在使用网站的过程中，必须遵守如下原则：</h3>
            <h3 :style="{paddingLeft:'20px'}">1.遵守中国的有关法律和法规；</h3>
            <h3 :style="{paddingLeft:'20px'}">2.使用网络服务不作非法用途；</h3>
            <h3 :style="{paddingLeft:'20px'}">3.不干扰和混乱网络服务；</h3>
            <h3 :style="{paddingLeft:'20px'}">4.遵守所有使用网络服务的网络协议、规定、程序和惯例；</h3>
            <h3 :style="{paddingLeft:'20px'}">5.不传输任何非法的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽等信息资料；</h3>
            <h3 :style="{paddingLeft:'20px'}">6.不传输任何教唆他人构成犯罪行为的资料；</h3>
            <h3 :style="{paddingLeft:'20px'}">7.用户不得故意或者过失损害网站合法权利和利益。及时回复。</h3>
            <h3 :style="{fontWeight:'800'}">关于责任</h3>
            <h3>鉴于网络服务的特殊性，本网站有权在事先通知的情况下，变更、中断、升级部分网络服务。本网站不担保网络服务不会中断，但承诺在用户可承受的时间内快速恢复服务，同时确保用户数据的安全性和可靠性。</h3>
            <h3 :style="{fontWeight:'800'}">免责条款</h3>
            <h3>鉴于互联网服务的特点，本网站对用户自行上传的资料不承担任何法律责任，希望各网友对网站提供的互动服务中的内容进行监督，若发现存在侵犯任何第三人著作权等合法权益的内容，请及时告知，我们将严格按照《信息网络传播权保护条例》中的规定予以删除。</h3>
            <h3 :style="{paddingLeft:'20px'}">1.本网站属于非赢利性网站，转载的文章遵循原作者的版权声明，如果原文没有版权声明，按照目前互联网开放的原则，我们将在不通知作者的情况下，转载文章；如果原文明确注明“禁止转载”，我们一定不会转载。
              如果我们转载的文章不符合作者的版权声明或者作者不想让我们转载您的文章的话，请来信告知：<a href="mailto:zyt1@gmail.com">zyt1@gmail.com</a></h3>
            <h3 :style="{paddingLeft:'20px'}">2.本网站转载文章仅为传播更多信息之目的，凡在本网站出现的信息，均仅供参考。本网站将尽力确保所提供信息的准确性及可靠性，但不保证信息的正确性和完整性，且不对因信息的不正确或遗漏导致的任何损失或损害承担责任。</h3>
            <h3 :style="{paddingLeft:'20px'}">3.任何透过本网站网页而链接及得到的资讯、产品及服务，本网站概不负责，亦不负任何法律责任。</h3>
            <h3 :style="{paddingLeft:'20px'}">4.本网站所刊发、转载的文章，其版权均归原作者所有，如其他媒体、网站或个人从本网下载使用，请在转载有关文章时务必尊重该文章的著作权，保留本网注明的“稿件来源”，并自负版权等法律责任。</h3>
            <h3 :style="{fontWeight:'800'}">侵权投诉</h3>
            <h3>Clms平台是一个接受外来投稿的平台，部分图片和文字来自互联网或原作者自行编辑。投稿到Clms平台的文章，默认作者授权其全部图文内容在Clms平台、在其微信公众号及微博帐号进行发布，Clms平台对这一部分内容不进行预先审查。
              如您发现平台上文章或图片涉嫌侵犯您的权利请您将所涉及的文章 URL 和侵权理由以邮件形式发送到邮箱（<a href="mailto:zyt1@gmail.com">zyt1@gmail.com</a>），我们将在核实情况后依照《中华人民共和国侵权责任法》及其司法解释对内容进行屏蔽、删除和通知原作者。</h3>
            <h3 :style="{fontWeight:'800'}">服务条款的修改</h3>
            <h3>本网站保留在必要时对本协议修改的权利，一旦发生变动，这些条款可由网站项目组及时更新，且毋须另行通知，修改后的条款一旦在网页上公布即有效代替原来的服务条款。您可随时查阅最新版服务条款。</h3>
            <h3>本协议最终解释权归本网站所有。</h3>
          </div>
          <div v-if="this.current[0]==='we'">
            <h3>一群有理想且热爱生活的前进者。</h3>
          </div>
          <div v-if="this.current[0]==='help'">
            <h3 :style="{fontWeight:'800'}">注册登录</h3>
            <p><a href="#" :style="{paddingLeft:'20px'}">如何注册</a><br>
              <a href="#" :style="{paddingLeft:'20px'}">如何登录平台</a><br>
              <a href="#" :style="{paddingLeft:'20px'}">忘记登录密码怎么办</a><br>
              <a href="#" :style="{paddingLeft:'20px'}">如何修改登录密码</a><br></p>
            <h3 :style="{fontWeight:'800'}">信息认证</h3>
            <p><a href="#" :style="{paddingLeft:'20px'}">如何修改个人基本资料</a><br>
              <a href="#" :style="{paddingLeft:'20px'}">如何申请实名认证</a><br>
              <a href="#" :style="{paddingLeft:'20px'}">如何绑定手机和邮箱</a><br>
              <a href="#" :style="{paddingLeft:'20px'}">如何更换绑定的手机和邮箱</a><br></p>
            <h3 :style="{fontWeight:'800'}">文章/答疑</h3>
            <p><a href="#" :style="{paddingLeft:'20px'}">如何发布文章</a><br>
              <a href="#" :style="{paddingLeft:'20px'}">如何发布问题</a><br>
              <a href="#" :style="{paddingLeft:'20px'}">如何发表评论</a><br>
              <a href="#" :style="{paddingLeft:'20px'}">如何解答问题</a><br></p>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      current: ['we']
    }
  }
}
</script>
<style>
</style>
