<template>
    <div>
        <modal :show.sync="!web3.isInjected"
                gradient="danger"
                modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">Oops!</h6>

            <div class="py-3 text-center">
                <i class="ni ni-bell-55 ni-3x"></i>
                <h4 class="heading mt-4">MetaMask not found</h4>
                <p>You need to download the MetaMask extension to work this dApp</p>
            </div>
        </modal>

        <div class="position-relative">
            <!-- shape Hero -->
            <section class="section-shaped my-0">
                <div class="shape shape-style-1 bg-gradient-success shape-skew">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="container shape-container d-flex">
                    <div class="col px-0">
                        <div class="row">
                            <div class="col-lg-6">
                                <h1 class="display-3  text-white">My Certifications 
                                </h1>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>

            <section v-if="web3.isInjected" class="section section-lg pt-lg-0 mt--200">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="row row-grid">
                            <div v-if="userCerts.includes(course.id)" v-for="(course, idx) in courses" :key="idx" class="col-lg-4">
                                <card class="border-0" hover shadow body-classes="py-5" style="margin-bottom: 30px;">
                                    <icon v-if="course.tags.includes('chem')" name="fa fa-flask" type="primary" rounded class="mb-4">
                                    </icon>
                                    <icon v-if="course.tags.includes('cs')" name="fa fa-desktop" type="success" rounded class="mb-4">
                                    </icon>
                                    <icon v-if="course.tags.includes('physics')" name="fa fa-globe" type="warning" rounded class="mb-4">
                                    </icon>

                                    <h6 class="text-primary text-uppercase">{{ course.courseName }}</h6>
                                    
                                    <p class="description mt-3">{{ course.courseDetails }}</p>
                                    
                                    <h6 class="text-primary text-uppercase">{{ gradesObtained[course.id] }}%</h6>
                                    <div v-for="tag in course.tags" :key="tag">
                                        <badge type="primary" rounded>{{tag}}</badge>
                                    </div>
                                </card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { db } from "../main";
import Web3 from "web3";
export default {
  name: "mycerts",
  beforeCreate() {
    console.log("registerWeb3 Action dispatched");
    this.$store.dispatch("registerWeb3");
  },
  created() {
    this.$store.dispatch("getContractInstance");
    this.$store.state
      .contractInstance()
      .methods.getCertificateIds()
      .call({ from: this.$store.state.web3.coinbase }, (err, result) => {
        this.userCerts = result;
        this.userCerts.forEach(cert => {
          this.$store.state
            .contractInstance()
            .methods.getCertificate(cert)
            .call({ from: this.$store.state.web3.coinbase }, (err, result) => {
              this.gradesObtained[cert] = result.gradeObtained;
            });
        });
      });
  },
  computed: {
    web3() {
      return this.$store.state.web3;
    }
  },
  data() {
    return {
      userCerts: [],
      courses: [],
      gradesObtained: {}
    };
  },
  methods: {},
  components: {
    Modal
  },
  firestore() {
    return {
      courses: db.collection("courses")
    };
  }
};
</script>
