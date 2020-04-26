import React from 'react';
import {View, TextInput,TouchableOpacity} from 'react-native';
import Icons from 'Root/src/elements/Icon';
import { withThemes, colors } from 'Root/src/themes';
import I18n from 'react-native-i18n';
import ValidateRegex from "Root/src/utils/ValidateRegex"
@withThemes
export default class InputSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            canClear: false,
            value: null,
        }
    }
    onTextChange=(text)=>{
        const {changeText} = this.props
        if (text!=='') 
            this.setState({
                canClear:true,
            });
        else
            this.setState({
                canClear:false,
            });

            text = text.replace(ValidateRegex.CHARACTER_NAME_PATTERN, '');
        this.setState({
            value:text
        });
        changeText(text)
    }
    onClear=()=>{
        this.setState({
            value: null,
            canClear: false,
        })
        this.props.onClear()
    }
    render(){
        return(
            <View
                cls={['flx-row flx-i aic bdRadius-10 mr-12 ph-8']}
                style={{ backgroundColor: 'rgba(255,255,255,0.24)' }}
            >
                <Icons name="ios-search" cls="f-23" color="white" />
                <TextInput 
                    placeholder={I18n.t('searchByAgentNameOrPhone')}
                    placeholderTextColor={colors.white}
                    underlineColorAndroid="transparent"
                    cls="ml-8 f-15 ff-regular white flx-i pv-2 height-35 asc"
                    value={this.state.value}
                    onChangeText={(text)=>{this.onTextChange(text)}}
                    maxLength={50}
                />
                {this.state.canClear&&(
                    <TouchableOpacity
                        onPress={this.onClear}
                    >
                        <Icons name="ios-close" cls="f-24" color="rgba(255,255,255,0.5)" />
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}