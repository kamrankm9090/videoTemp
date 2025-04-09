import React, {useEffect, useState} from 'react';
import {useController} from 'react-hook-form';
import {Tick} from '~/assets/svgs';
import {
  AppHelperText,
  AppLoading,
  AppText,
  AppTouchable,
  HStack,
  VStack,
} from '~/components';
import {Colors} from '~/styles';

type Props = {
  name: string;
  data: string[] | object[] | number[];
  placeholder?: string;
  loading?: boolean;
  titleKey?: string;
  valueKey?: string;
  onChange?: (val: any) => void;
  limit?: number;
  prompt?: string;
};

const AppMultiSelect = React.forwardRef(
  ({
    name,
    data,
    loading,
    titleKey = 'title',
    valueKey = 'value',
    onChange,
    limit,
    prompt,
  }: Props) => {
    const {field, fieldState} = useController({name});
    const [items, setItems] = useState<string[]>(field?.value || []);

    useEffect(() => {
      setItems(field.value);
    }, [field.value]);

    function checkBoxOnPress(item: any, val: boolean) {
      if (val) {
        const filtered = items.filter(function (itm: any) {
          if (valueKey) {
            return itm !== item?.[valueKey];
          }
          return itm !== item;
        });
        setItems(filtered);
      } else {
        if (limit) {
          if (items?.length > 0) {
            if (items?.length < limit) {
              if (valueKey) {
                setItems(prevState => [...prevState, item?.[valueKey]]);
              } else {
                setItems(prevState => [...prevState, item]);
              }
            }
          } else {
            if (valueKey) {
              setItems([item?.[valueKey]]);
            } else {
              setItems([item]);
            }
          }
        } else {
          if (items?.length > 0) {
            if (valueKey) {
              setItems(prevState => [...prevState, item?.[valueKey]]);
            } else {
              setItems(prevState => [...prevState, item]);
            }
          } else {
            if (valueKey) {
              setItems([item?.[valueKey]]);
            } else {
              setItems([item]);
            }
          }
        }
      }
    }

    function isEnable(item: any) {
      if (items) {
        const res = items?.find((itm: any) => {
          if (valueKey) {
            return itm === item?.[valueKey];
          } else {
            return itm === item;
          }
        });
        if (res) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    return (
      <VStack>
        {prompt && (
          <AppText marginBottom={24} color={Colors.WHITE}>
            {prompt}
          </AppText>
        )}
        <HStack flexWrap="wrap">
          {data?.map((itm: any, index: number) => {
            const isActive = isEnable(itm);
            const backgroundColor = isActive
              ? Colors.PRIMARY
              : Colors.NIGHT_RIDER;
            const textColor = Colors.WHITE;

            return (
              <AppTouchable
                onPress={() => checkBoxOnPress(itm, isActive)}
                key={`listItem${index}`}
                mb={8}
                ms={8}
                px={8}
                py={6}
                gap={4}
                rounded={5}
                borderWidth={1}
                alignItems="center"
                bg={backgroundColor}
                flexDirection="row">
                {isActive && <Tick />}
                <AppText color={textColor}>
                  {titleKey ? itm?.[titleKey] : itm}
                </AppText>
              </AppTouchable>
            );
          })}
        </HStack>
        {loading && <AppLoading />}
        {!field.value && <AppHelperText error={fieldState?.error} />}
      </VStack>
    );
  },
);

AppMultiSelect.displayName = 'AppMultiSelect';

export default AppMultiSelect;
