<template>
    <BasicModal
        :footer="null"
        :title="t('layout.header.lockScreen')"
        v-bind="$attrs"
        :class="prefixCls"
        @register="register"
    >
        <div :class="`${prefixCls}__entry`">
            <div class="absolute -ml-12 text-center -top-0 left-1/2">
                <img :src="avatar" class="w-24" />
                <p class="mt-2 text-2xl">{{ getRealName }}</p>
            </div>

            <BasicForm @register="registerForm" />

            <div class="text-center">
                <a-button
                    type="primary"
                    block
                    class="mt-2"
                    @click="handleLock"
                >{{ t('layout.header.lockScreenBtn') }}</a-button>
            </div>
        </div>
    </BasicModal>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useDesign } from '/@/hooks/web/useDesign';
import { BasicModal, useModalInner } from '/@/components/Modal/index';
import { BasicForm, useForm } from '/@/components/Form/index';

import { useUserStore } from '/@/store/modules/user';
import { useLockStore } from '/@/store/modules/lock';
export default defineComponent({
    name: 'LockModal',
    components: { BasicModal, BasicForm },

    setup() {
        const { t } = useI18n();
        const { prefixCls } = useDesign('header-lock-modal');
        const userStore = useUserStore();
        const lockStore = useLockStore();

        const getRealName = computed(() => userStore.getUserInfo?.cn_name);
        const [register, { closeModal }] = useModalInner();

        const [registerForm, { validateFields, resetFields }] = useForm({
            showActionButtonGroup: false,
            schemas: [
                {
                    field: 'password',
                    label: t('layout.header.lockScreenPassword'),
                    component: 'InputPassword',
                    required: true,
                },
            ],
        });

        async function handleLock() {
            const values = (await validateFields()) as any;
            const password: string | undefined = values.password;
            closeModal();

            lockStore.setLockInfo({
                isLock: true,
                pwd: password,
            });
            await resetFields();
        }

        const avatar = computed(() => {
            const { avatar } = userStore.getUserInfo;
            return avatar;
        });

        return {
            t,
            prefixCls,
            getRealName,
            register,
            registerForm,
            handleLock,
            avatar,
        };
    },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-header-lock-modal";

.@{prefix-cls} {
    &__entry {
        position: relative;
        //height: 240px;
        padding: 130px 30px 30px 30px;
        border-radius: 10px;
    }
}
</style>
