import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import HeaderView from './HeaderView';
import NavBarContainer from '../NavBar/NavBarContainer';

const urlLink = 'https://cbiit.github.io/nci-softwaresolutions-elements/banners/government-shutdown.html';

export const useMutationObserver = (
  ref,
  callback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
    return ref;
  }, [callback, options]);
};

const HeaderWithGovAlert = ({
  classes,
}) => {
  const govAlertRef = useRef();
  const [alertBannerHeight, setHeight] = useState(0);
  const interceptor = async () => {
    axios.interceptors.response.use(
      (res) => {
        setHeight(govAlertRef?.current?.offsetHeight);
        return res;
      },
      (err) => {
        throw new Error(err.response.data.message);
      },
    );
  };

  useEffect(() => {
    interceptor();
  }, []);

  const AlertPlaceholder = (url) => {
    const [link, setLink] = useState(url);
    useEffect(() => {
      setLink(url);
    }, []);
    return (
      <include-html src={link}>
        <p className={classes.placeholder} />
      </include-html>
    );
  };

  // add local store for testing purpose
  if (!localStorage.getItem('govAlertUrl')) {
    localStorage.setItem('govAlertUrl', urlLink);
  }
  const govAltUrl = localStorage.getItem('govAlertUrl');

  return (
    <div>
      <div id="govAlertMsg" ref={govAlertRef}>
        <p className={classes.placeholder} />
        {AlertPlaceholder(govAltUrl)}
      </div>
      {(govAlertRef.current && govAlertRef.current.offsetHeight)
        && <HeaderView offsetHeight={alertBannerHeight} />}
      {(govAlertRef.current && govAlertRef.current.offsetHeight)
        && <NavBarContainer offsetHeight={alertBannerHeight} />}
    </div>
  );
};

const styles = () => ({
  placeholder: {
    height: '1px',
  },
});

export default withStyles(styles)(HeaderWithGovAlert);
