<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link to="/" slot="brand" class="navbar-brand mr-lg-5">SecurEd
            </router-link>

            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
                    <router-link to="/courses" slot="title" class="nav-link" data-toggle="dropdown" role="button"
                           >
                    
                        <i class="ni ni-ui-04 d-lg-none"></i>
                        <span class="nav-link-inner--text" v-on:click="$store.state.currentlyShowing = 'all'">Courses</span>
                    </router-link>
                    <div class="dropdown-menu-inner">
                        <a href="#chem"
                           class="media d-flex align-items-center"
                           v-on:click="$store.state.currentlyShowing = 'chem'">
                            <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                <i class="fa fa-flask"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h6 class="heading text-primary mb-md-1">Chemistry</h6>
                                <p class="description d-none d-md-inline-block mb-0">Atoms, elements, and molecules</p>
                            </div>
                        </a>

                        <a href="#cs"
                           class="media d-flex align-items-center"
                           v-on:click="$store.state.currentlyShowing = 'cs'">                           
                            <div class="icon icon-shape bg-gradient-success rounded-circle text-white">
                                <i class="fa fa-desktop"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h6 class="heading text-primary mb-md-1">Computer Science</h6>
                                <p class="description d-none d-md-inline-block mb-0">Computers and Computer Systems</p>
                            </div>
                        </a>

                        <a href="#physics"
                           class="media d-flex align-items-center"
                           v-on:click="$store.state.currentlyShowing = 'physics'">
                           
                            <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                <i class="fa fa-globe"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h6 class="heading text-primary mb-md-1">Physics</h6>
                                <p class="description d-none d-md-inline-block mb-0">Study of the natural world</p>
                            </div>
                        </a>
                        
                    </div>
                </base-dropdown>
                    <router-link to="/mycerts" slot="title" class="nav-link" role="button">
                        <i class="ni ni-collection d-lg-none"></i>
                        <span class="nav-link-inner--text">My Certifications</span>
                    </router-link>
            </ul>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="#" target="_blank"
                       data-toggle="tooltip" title="Like us on Facebook">
                        <i class="fa fa-facebook-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Facebook</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="#" target="_blank"
                       data-toggle="tooltip" title="Follow us on Twitter">
                        <i class="fa fa-twitter-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Twitter</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="#"
                       target="_blank" data-toggle="tooltip" title="Star us on Github">
                        <i class="fa fa-github"></i>
                        <span class="nav-link-inner--text d-lg-none">Github</span>
                    </a>
                </li>
            </ul>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style>
</style>
