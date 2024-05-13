<script>
  import { Router, Route, Link } from 'svelte-routing';
  import { onMount } from 'svelte';
  import checkSession from './util/checkSession.js';
  import PrivateRouteGuard from './components/ProtectedRoutes/ProtectedRoutes.svelte';
  import Footer from "./components/Footer/Footer.svelte";
  import Header from "./components/Header/Header.svelte";
  import Home from "./pages/Home/Home.svelte";
  import Unauthorized from './pages/Auth/Auth.svelte';
  import RateLimitExceeded from './pages/RateLimit/RateLimit.svelte';
    import User from './pages/User/User.svelte';
    import Contact from './pages/Contact/Contact.svelte';
    import Chat from './pages/Chat/Chat.svelte';
    import Login from './pages/Login/Login.svelte';

  onMount(async () => {
      await checkSession();
  });

</script>



<main>
  <Header />
  <Router>
    <Route path="/" component={Login} />

    <Route path="/Home">
      <PrivateRouteGuard>
        <Home />
      </PrivateRouteGuard>
    </Route>

    <Route path="/User">
      <PrivateRouteGuard>
        <User />
      </PrivateRouteGuard>
    </Route>
    <Route path="/Contact">
      <PrivateRouteGuard>
        <Contact />
      </PrivateRouteGuard>
    </Route>

    <Route path="/Chat">
      <PrivateRouteGuard>
        <Chat />
      </PrivateRouteGuard>
    </Route>
    
    <Route path="/Unauthorized" component={Unauthorized} />

    <Route path="/RateLimitExceeded" component={RateLimitExceeded} />
  </Router>

  <Footer />
</main>