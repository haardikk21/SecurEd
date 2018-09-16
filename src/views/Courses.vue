<template>
    <div>
        <modal :show.sync="modals.quiz"
            gradient="success"
            modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">{{ quiz.courseName }}</h6>
            <div v-for="(qa, idx) in quiz.QA" :key="idx">
                <b>{{qa.question}}</b>
                <base-radio :name="qa.optionA" class="mb-3" v-model="radios[idx]">
                        {{qa.optionA}}
                </base-radio>
                <base-radio :name="qa.optionB" class="mb-3" v-model="radios[idx]">
                        {{qa.optionB}}
                </base-radio>
                <base-radio :name="qa.optionC" class="mb-3" v-model="radios[idx]">
                        {{qa.optionC}}
                </base-radio>
            </div>
                <i v-if="pendingSubmit" :disabled="pendingSubmit" class="fa fa-spinner fa-spin fa-3x"></i>
            
            <base-button type="white"
                            @click="submitCourse(quiz);">
                    Submit
            </base-button>
        </modal>

        <modal :show.sync="modals.enrollForCourse"
            gradient="primary"
            modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">Enroll for {{ modalData.courseName }}</h6>

            <div class="py-3 text-center">
                <i v-if="modalData.tags.includes('chem')" class="fa fa-flask fa-3x">
                </i>
                <i v-if="modalData.tags.includes('cs')" class="fa fa-desktop fa-3x">
                </i>
                <i v-if="modalData.tags.includes('physics')" class="fa fa-globe fa-3x">
                </i>
                <h4 class="heading mt-4">Description</h4>
                <p>{{ modalData.courseDetails }}</p>
                <i v-if="pendingEnroll" :disabled="pendingEnroll" class="fa fa-spinner fa-spin fa-3x"></i>
            </div>

            <template slot="footer">
                <base-button type="white"
                            @click="modals.enrollForCourse = false; enrollForCourse(modalData)">
                    Enroll
                </base-button>
                <base-button type="link"
                            text-color="white"
                            class="ml-auto" @click="modals.enrollForCourse = false">Close</base-button>
            </template>
        </modal>

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
                <div class="shape shape-style-1 bg-gradient-warning shape-skew">
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
                                <h1 class="display-3  text-white">Courses designed 
                                    <span>for you to succeed</span>
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
                            <div v-show="course.tags.includes($store.state.currentlyShowing) || $store.state.currentlyShowing == 'all'" v-for="(course, idx) in courses" :key="idx" class="col-lg-4">
                                <card class="border-0" hover shadow body-classes="py-5" style="margin-bottom: 30px;">
                                    <icon v-if="course.tags.includes('chem')" name="fa fa-flask" type="primary" rounded class="mb-4">
                                    </icon>
                                    <icon v-if="course.tags.includes('cs')" name="fa fa-desktop" type="success" rounded class="mb-4">
                                    </icon>
                                    <icon v-if="course.tags.includes('physics')" name="fa fa-globe" type="warning" rounded class="mb-4">
                                    </icon>

                                    <h6 class="text-primary text-uppercase">{{ course.courseName }}</h6>
                                    <p class="description mt-3">{{ course.courseDetails }}</p>
                                    <div v-for="tag in course.tags" :key="tag">
                                        <badge type="primary" rounded>{{tag}}</badge>
                                    </div>
                                    <base-button v-if="!currentlyTakingCourses.includes(course.id)" tag="a" href="#" type="primary" class="mt-4" @click="openModal(course)">
                                        Learn more
                                    </base-button>
                                    
                                    <base-button v-else type="primary"
                                    text-color="white"
                                    class="mt-4" @click="modals.enrollForCourse = false; openQuiz(course)">Enrolled</base-button>
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
  name: "courses",
  beforeCreate() {
    this.$store.dispatch("registerWeb3");
  },
  mounted() {
    this.$store.dispatch("getContractInstance");
    this.$store.state
      .contractInstance()
      .methods.getEnrolledCourses()
      .call(
        {
          from: this.$store.state.web3.coinbase
        },
        (err, result) => {
          this.currentlyTakingCourses = result;
        }
      );
  },
  computed: {
    web3() {
      return this.$store.state.web3;
    }
  },
  data() {
    return {
      courses: [],
      currentlyTakingCourses: [],
      modalData: {
        id: null,
        courseName: "",
        courseDetails: "",
        tags: []
      },
      quiz: {
        id: null,
        courseName: "",
        courseDetails: "",
        tags: [],
        QA: []
      },
      radios: [],
      modals: {
        enrollForCourse: false,
        quiz: false
      },
      pendingEnroll: false,
      pendingSubmit: false
    };
  },
  methods: {
    openQuiz(course) {
      this.quiz = course;
      this.modals.quiz = true;
    },
    openModal(course) {
      this.modalData = course;
      this.modals.enrollForCourse = true;
    },
    submitCourse(quiz) {
      this.pendingSubmit = true;
      let totalQuestions = quiz.QA.length;
      let correctAnswers = 0;
      this.radios.forEach((radio, idx) => {
        if (quiz.QA[idx].answer == radio) {
          correctAnswers++;
        }
        let gradeObtained = correctAnswers / totalQuestions * 100;
        this.$store.state
          .contractInstance()
          .methods.issueCertificate(
            this.$store.state.web3.coinbase,
            quiz.id,
            gradeObtained
          )
          .send(
            {
              from: this.$store.state.web3.coinbase
            },
            (err, result) => {
              if (err) {
                console.log(err);
                this.pendingSubmit = false;
              } else {
                /*this.$store.state
                .contractInstance()
                .events.certificateIssued()((err, event) => {
                  console.log(event);
                })
                .on("data", function(event) {
                  console.log(event); // same results as the optional callback above
                })
                .on("changed", function(event) {
                  // remove event from local database
                })
                .on("error", console.error);*/
                this.pendingEnroll = false;
              }
            }
          );
      });
    },
    enrollForCourse(course) {
      this.pendingEnroll = true;
      this.$store.state
        .contractInstance()
        .methods.enrollInCourse(course.id)
        .send(
          {
            from: this.$store.state.web3.coinbase,
            value: this.$store.state.web3.web3Instance().toWei("0.1", "ether")
          },
          (err, result) => {
            if (err) {
              console.log(err);
              this.pendingEnroll = false;
            } else {
              /*this.$store.state
                .contractInstance()
                .events.studentEnrolled()((err, event) => {
                  console.log(event);
                })
                .on("data", function(event) {
                  console.log(event); // same results as the optional callback above
                })
                .on("changed", function(event) {
                  // remove event from local database
                })
                .on("error", console.error);*/
              this.pendingEnroll = false;
            }
          }
        );
    }
  },
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
