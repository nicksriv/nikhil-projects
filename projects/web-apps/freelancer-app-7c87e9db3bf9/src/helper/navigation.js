import {
    CommonActions,
    StackActions,
    NavigationAction,
    TabActions,
} from "@react-navigation/native";

const navigationHelper = {};

// store navigation ref
navigationHelper.ref = null;

// setTopLevelNavigator: call at beginning to store ref
navigationHelper.setTopLevelNavigator = (ref) => {
    navigationHelper.ref = ref;
};

// dispatch: function to dispatch navigation related actions
navigationHelper.dispatch = (action) => {
    navigationHelper.ref.dispatch(action);
};

// navigate: function to navigate between screens
navigationHelper.navigate = ({ name, params, key }) => {
    navigationHelper.dispatch(
        CommonActions.navigate({
            name,
            params,
            key,
        })
    );
};

// goBack: function to navigate screen one step back
navigationHelper.goBack = () => {
    navigationHelper.dispatch(CommonActions.goBack());
};

// replace: function to replace current index with new route
navigationHelper.replace = ({ name, params, key }) => {
    navigationHelper.goBack();
    navigationHelper.navigate({ name, params, key });
}

// popToTop: function to clear navigation stack
navigationHelper.popToTop = () => {
    navigationHelper.dispatch(StackActions.popToTop());
};

// stackFirst: function to clear navigation stack and navigate to new screen
navigationHelper.stackFirst = ({ name, params, key }) => {
    navigationHelper.popToTop();
    navigationHelper.navigate({ name, params, key });
};

// jumpTo: function to jump between tab navigations
navigationHelper.jumpTo = ({ name, params }) => {
    navigationHelper.dispatch(TabActions.jumpTo(name, params));
};

// reset navigation stack
navigationHelper.reset = ({ name, params }) => {
    navigationHelper.reset({
        index: 1,
        routes: [
          {
            name,
            params,
          },
        ],
    })
};

export { navigationHelper };
