import { useState } from "react";
import {
  INFLUENCER_CRUD,
  Influencer,
  InfluencerFormData,
  SOCIAL_MEDIA_PLATFORM,
  SocialMediaAccount,
  initalInfluencerFormState,
  initialSocialMediaAccountState,
} from "../../types/influencer";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  createInfluencer,
  deleteInfluencer,
  updateInfluencer,
} from "../../state/influencer/influencerSlice";
import BaseButton from "../base_components/BaseButton";
import BaseCloseButton from "../base_components/BaseCloseButton";

export default function InfluencerForm({
  influencer,
  onClose,
}: {
  influencer: Influencer | InfluencerFormData;
  onClose: () => void;
}) {
  const employees = useAppSelector((state) => state.employee.employees);
  const [formState, setFormState] = useState(influencer);
  const [socialMediaState, setSocialMediaState] = useState(
    initialSocialMediaAccountState
  );
  const [errors, setErrors] = useState<{ [x: string]: string[] }>({});
  const dispatch = useAppDispatch();

  const addSocialAccount = () => {
    if (!socialMediaState.username) return;
    setFormState({
      ...formState,
      social_media_accounts: [
        ...formState.social_media_accounts,
        {
          id: null,
          platform: socialMediaState.platform,
          username: socialMediaState.username,
        },
      ],
    });
    setSocialMediaState(initialSocialMediaAccountState);
    setErrors({});
  };

  function updateSocialMediaAccount(
    account: SocialMediaAccount | null,
    index: number
  ) {
    if (!account) {
      // If account is null then it is deleted otherwise change the values
      setFormState({
        ...formState,
        social_media_accounts: formState.social_media_accounts.filter(
          (_, i) => i !== index
        ),
      });
    } else {
      const changedAccountList = formState.social_media_accounts.map(
        (socialAccount, i) => {
          if (i === index) {
            return account;
          }
          return socialAccount;
        }
      );
      setFormState({ ...formState, social_media_accounts: changedAccountList });
    }
  }

  const handleForm = async (formAction: INFLUENCER_CRUD) => {
    try {
      switch (formAction) {
        case INFLUENCER_CRUD.CREATE:
          await dispatch(
            createInfluencer(formState as InfluencerFormData)
          ).unwrap();
          break;
        case INFLUENCER_CRUD.UPDATE:
          await dispatch(updateInfluencer(formState as Influencer)).unwrap();
          break;
        case INFLUENCER_CRUD.DELETE:
          await dispatch(
            deleteInfluencer((formState as Influencer).id)
          ).unwrap();
          break;
      }
      setFormState(initalInfluencerFormState);
      onClose();
    } catch (err: any) {
      setErrors(err);
    }
  };

  return (
    <>
      <form className="max-w-md mx-auto py-4">
        <div className="mb-4">
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={formState.first_name}
            onChange={(e) =>
              setFormState({ ...formState, first_name: e.target.value })
            }
            maxLength={50}
            className="w-full p-2 border rounded"
          />
          {errors["first_name"] && (
            <div className="text-red-500 mb-4">*{errors["first_name"]}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={formState.last_name}
            onChange={(e) =>
              setFormState({ ...formState, last_name: e.target.value })
            }
            maxLength={50}
            className="w-full p-2 border rounded"
          />
          {errors["last_name"] && (
            <div className="text-red-500 mb-4">*{errors["last_name"]}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="employees">Manager</label>
          <select
            id="employees"
            value={formState.manager_id || 0}
            onChange={(e) =>
              setFormState({
                ...formState,
                manager_id: Number(e.target.value),
              })
            }
            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option>No Manager Assigned</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.first_name} {employee.last_name} ({employee.email})
              </option>
            ))}
          </select>
          {(errors["manager"] || errors["manager_id"]) && (
            <>
              <div className="text-red-500 mb-4">*{errors["manager"]}</div>
              <div className="text-red-500 mb-4">*{errors["manager_id"]}</div>
            </>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="social_media_accounts">Social Media Accounts</label>
          <div className="mb-2">
            <div className="flex">
              <select
                value={socialMediaState.platform}
                onChange={(e) =>
                  setSocialMediaState({
                    ...socialMediaState,
                    platform: e.target.value as SOCIAL_MEDIA_PLATFORM,
                  })
                }
                className="mr-2 p-2 border rounded"
              >
                {Object.values(SOCIAL_MEDIA_PLATFORM).map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              <input
                id="username"
                name="username"
                type="text"
                value={socialMediaState.username}
                onChange={(e) =>
                  setSocialMediaState({
                    ...socialMediaState,
                    username: e.target.value,
                  })
                }
                placeholder="Username"
                maxLength={50}
                className="flex-grow mr-2 p-2 border rounded"
              />
              <BaseButton
                onClick={addSocialAccount}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add
              </BaseButton>
            </div>
            {errors["username"] && (
              <div className="text-red-500 mb-4">*{errors["username"]}</div>
            )}
          </div>

          {formState.social_media_accounts.map((account, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center">
                <select
                  value={account.platform}
                  onChange={(e) =>
                    updateSocialMediaAccount(
                      {
                        ...account,
                        platform: e.target.value as SOCIAL_MEDIA_PLATFORM,
                      },
                      index
                    )
                  }
                  className="mr-2 p-2 border rounded"
                >
                  {Object.values(SOCIAL_MEDIA_PLATFORM).map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={account.username}
                  onChange={(e) =>
                    updateSocialMediaAccount(
                      {
                        ...account,
                        username: e.target.value,
                      },
                      index
                    )
                  }
                  placeholder="Username"
                  maxLength={50}
                  className="flex-grow mr-2 p-2 border rounded"
                />
                <BaseButton
                  onClick={() => updateSocialMediaAccount(null, index)}
                  className="text-red-500"
                >
                  Remove
                </BaseButton>
              </div>
              {errors["social_media_accounts"] &&
                errors["social_media_accounts"][index] && (
                  <div className="text-red-500 mb-4">
                    *{errors["social_media_accounts"][index]}
                  </div>
                )}
            </div>
          ))}
        </div>
      </form>

      <div className="flex justify-end gap-2">
        {"id" in formState ? (
          <>
            <BaseButton onClick={() => handleForm(INFLUENCER_CRUD.UPDATE)}>
              Save
            </BaseButton>
            <BaseButton
              onClick={() => handleForm(INFLUENCER_CRUD.DELETE)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Delete
            </BaseButton>
          </>
        ) : (
          <BaseButton onClick={() => handleForm(INFLUENCER_CRUD.CREATE)}>
            Create
          </BaseButton>
        )}
        <BaseCloseButton onClose={() => onClose()} />
      </div>
    </>
  );
}
